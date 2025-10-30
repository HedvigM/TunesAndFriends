import { NextApiRequest, NextApiResponse } from "next";
import { userService } from "services/userService";

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { auth0UserId } = req.query as { auth0UserId: string };

  if (!auth0UserId) {
    return res.status(400).json({ message: "auth0UserId is required" });
  }

  // Call service layer
  const result = await userService.getUserByAuth0Id(auth0UserId);

  if (!result.success) {
    const statusCode = result.statusCode || 500;
    return res.status(statusCode).json({
      message: result.error,
    });
  }

  return res.status(200).json({
    message: "User retrieved successfully",
    data: result.data,
  });
};

export default user;
