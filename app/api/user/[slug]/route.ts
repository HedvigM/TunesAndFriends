import { NextRequest, NextResponse } from "next/server";
import { userService } from "services/userService";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = await params;
    const userId = parseInt(slug);

    if (isNaN(userId)) {
      return NextResponse.json(
        { message: "Invalid user ID" },
        { status: 400 }
      );
    }

    // Call service layer
    const result = await userService.getUserById(userId);

    if (!result.success) {
      const statusCode = result.statusCode || 500;
      return NextResponse.json(
        { message: result.error },
        { status: statusCode }
      );
    }

    return NextResponse.json({
      message: "User retrieved successfully",
      data: result.data,
    });
  } catch (error) {
    console.error("Error in GET /api/user/[slug]:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

