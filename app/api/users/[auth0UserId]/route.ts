import { NextRequest, NextResponse } from "next/server";
import { userService } from "services/userService";

interface RouteParams {
  params: Promise<{ auth0UserId: string }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { auth0UserId } = await params;

    if (!auth0UserId) {
      return NextResponse.json(
        { message: "auth0UserId is required" },
        { status: 400 }
      );
    }

    // Call service layer
    const result = await userService.getUserByAuth0Id(auth0UserId);

    if (!result.success) {
      const statusCode = result.statusCode || 500;
      return NextResponse.json(
        {
          message: result.error,
        },
        { status: statusCode }
      );
    }

    return NextResponse.json({
      message: "User retrieved successfully",
      data: result.data,
    });
  } catch (error) {
    console.error("Error in GET /api/users/[auth0UserId]:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

