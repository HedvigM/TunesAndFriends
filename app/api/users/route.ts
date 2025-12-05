import { NextRequest, NextResponse } from "next/server";
import { userService } from "services/userService";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tuneId = searchParams.get("tuneId");

    let result;
    if (tuneId) {
      // List users with specific tune
      const parsedTuneId = parseInt(tuneId);
      if (isNaN(parsedTuneId)) {
        return NextResponse.json(
          { message: "Invalid tuneId parameter" },
          { status: 400 }
        );
      }
      result = await userService.listUsersWithTune(parsedTuneId);
    } else {
      // List all users
      result = await userService.listUsers();
    }

    if (!result.success) {
      return NextResponse.json(
        { message: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Users retrieved successfully",
      data: result.data,
    });
  } catch (error) {
    console.error("Error in GET /api/users:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, auth0UserId } = body;

    // Validate required fields
    if (!name || !email || !auth0UserId) {
      return NextResponse.json(
        {
          message: "Missing required fields: name, email, auth0UserId",
        },
        { status: 400 }
      );
    }

    const result = await userService.createUser({
      name,
      email,
      auth0UserId,
    });

    if (!result.success) {
      const statusCode = result.statusCode || 500;
      return NextResponse.json(
        { message: result.error },
        { status: statusCode }
      );
    }

    return NextResponse.json(
      {
        message: `The user ${result.data?.name} was created`,
        data: result.data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/users:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, town, profileText } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        {
          message: "Missing required field: email",
        },
        { status: 400 }
      );
    }

    const result = await userService.updateUser(email, { town, profileText });

    if (!result.success) {
      return NextResponse.json(
        { message: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: `The user ${result.data?.name} updated`,
      data: result.data,
    });
  } catch (error) {
    console.error("Error in PATCH /api/users:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

