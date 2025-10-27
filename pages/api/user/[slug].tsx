import { NextApiRequest, NextApiResponse } from "next";
import { userService } from "services/userService";

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { slug } = req.query;
  const userId = parseInt(slug as string);

  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  // Call service layer
  const result = await userService.getUserById(userId);

  if (!result.success) {
    const statusCode = result.statusCode || 500;
    return res.status(statusCode).json({ message: result.error });
  }

  return res.status(200).json({
    message: "User retrieved successfully",
    data: result.data,
  });
};

export default user;
