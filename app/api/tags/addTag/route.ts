import { NextRequest, NextResponse } from "next/server";
import { tuneService } from "services/tuneService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tuneId, tagName } = body;

    if (!tuneId || !tagName) {
      return NextResponse.json(
        { error: "tuneId and tagName are required" },
        { status: 400 }
      );
    }

    const result = await tuneService.addTagToTune(tuneId, tagName);

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.error || "Failed to add tag",
        },
        { status: 500 }
      );
    }

    console.log("Tag added:", result.data);

    return NextResponse.json({
      message: `Tag "${tagName}" added to tune ${tuneId}`,
      tag: result.data?.tag,
      tune: result.data?.tune,
    });
  } catch (error) {
    console.error("Error adding tag:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

