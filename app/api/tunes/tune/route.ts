import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { tuneService } from "services/tuneService";

const getTunesByAuth0UserId = async (auth0UserId: string) => {
  const tunes = await prisma.tune.findMany({
    where: {
      knowedBy: {
        some: {
          auth0UserId: auth0UserId,
        },
      },
    },
    include: {
      tags: true,
    },
  });
  return tunes || [];
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const auth0UserId = searchParams.get("auth0UserId");
    const sessionId = searchParams.get("sessionId");

    // Handle getTunesByUserId (auth0UserId parameter)
    if (auth0UserId) {
      if (typeof auth0UserId !== "string") {
        return NextResponse.json(
          { error: "auth0UserId must be a string" },
          { status: 400 }
        );
      }

      const result = await getTunesByAuth0UserId(auth0UserId);
      return NextResponse.json(result);
    }

    // Handle getTune (sessionId parameter)
    if (sessionId) {
      const parsedSessionId = parseInt(sessionId);
      if (isNaN(parsedSessionId)) {
        return NextResponse.json(
          { error: "Invalid sessionId parameter" },
          { status: 400 }
        );
      }

      const result = await tuneService.getTuneBySessionId(parsedSessionId);
      if (!result.success) {
        const statusCode = result.statusCode || 500;
        return NextResponse.json(
          { error: result.error },
          { status: statusCode }
        );
      }

      return NextResponse.json(result.data);
    }

    return NextResponse.json(
      { error: "Either auth0UserId or sessionId is required" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error in GET /api/tunes/tune:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tune, email, knowOrLearn } = body;

    if (!tune || !email || !knowOrLearn) {
      return NextResponse.json(
        { error: "tune, email, and knowOrLearn are required" },
        { status: 400 }
      );
    }

    // Use tuneService to save tune
    if (knowOrLearn === "know" || knowOrLearn === "learn") {
      const result = await tuneService.saveTune({
        sessionId: tune,
        email: email,
        knowOrLearn: knowOrLearn,
      });

      if (!result.success) {
        return NextResponse.json(
          { message: result.error || "Failed to save tune" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: `The tune with id: ${tune} was updated or created`,
      });
    }

    return NextResponse.json(
      { error: "Invalid knowOrLearn value. Must be 'know' or 'learn'" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error in POST /api/tunes/tune:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

