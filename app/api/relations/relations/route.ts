import { NextRequest, NextResponse } from "next/server";
import { relationService } from "services/relationService";
import { userService } from "services/userService";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "userId is required" },
        { status: 400 }
      );
    }

    const parsedUserId = parseInt(userId);
    if (isNaN(parsedUserId)) {
      return NextResponse.json(
        { message: "Invalid userId parameter" },
        { status: 400 }
      );
    }

    // Get user's following and followers
    const userResult = await userService.getUserById(parsedUserId);
    if (!userResult.success || !userResult.data) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const user = userResult.data;
    return NextResponse.json({
      following: user.following || [],
      followedBy: user.followedBy || [],
    });
  } catch (error) {
    console.error("Error in GET /api/relations/relations:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { addingEmail, addedEmail } = body;

    if (!addingEmail || !addedEmail) {
      return NextResponse.json(
        { message: "addingEmail and addedEmail are required" },
        { status: 400 }
      );
    }

    // Get user IDs from emails
    const addingUserResult = await userService.getUserByEmail(addingEmail);
    const addedUserResult = await userService.getUserByEmail(addedEmail);

    if (!addingUserResult.success || !addingUserResult.data) {
      return NextResponse.json(
        { message: "User with addingEmail not found" },
        { status: 404 }
      );
    }

    if (!addedUserResult.success || !addedUserResult.data) {
      return NextResponse.json(
        { message: "User with addedEmail not found" },
        { status: 404 }
      );
    }

    const followerId = addingUserResult.data.id;
    const followingId = addedUserResult.data.id;

    // Use relationService to create the relation
    const result = await relationService.followUser({
      followerId,
      followingId,
    });

    if (!result.success) {
      return NextResponse.json(
        { message: result.error || "Failed to create relation" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "The relation was created",
    });
  } catch (error) {
    console.error("Error in POST /api/relations/relations:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const followerId = searchParams.get("followerId");
    const followingId = searchParams.get("followingId");

    if (!followerId || !followingId) {
      return NextResponse.json(
        { message: "followerId and followingId are required" },
        { status: 400 }
      );
    }

    const parsedFollowerId = parseInt(followerId);
    const parsedFollowingId = parseInt(followingId);

    if (isNaN(parsedFollowerId) || isNaN(parsedFollowingId)) {
      return NextResponse.json(
        { message: "Invalid followerId or followingId" },
        { status: 400 }
      );
    }

    const result = await relationService.unfollowUser({
      followerId: parsedFollowerId,
      followingId: parsedFollowingId,
    });

    if (!result.success) {
      return NextResponse.json(
        { message: result.error || "Failed to unfollow user" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "The relation was removed",
    });
  } catch (error) {
    console.error("Error in DELETE /api/relations/relations:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

