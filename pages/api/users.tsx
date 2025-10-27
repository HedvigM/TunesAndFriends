import { NextApiRequest, NextApiResponse } from "next";
import { userService } from "services/userService";

const users = async (req: NextApiRequest, res: NextApiResponse) => {
  // GET - List users (with optional tuneId filter)
  if (req.method === "GET") {
    const { tuneId } = req.query;

    let result;
    if (tuneId) {
      // List users with specific tune
      result = await userService.listUsersWithTune(parseInt(tuneId as string));
    } else {
      // List all users
      result = await userService.listUsers();
    }

    if (!result.success) {
      return res.status(500).json({ message: result.error });
    }

    return res.status(200).json({
      message: "Users retrieved successfully",
      data: result.data,
    });
  }

  // POST - Create user
  if (req.method === "POST") {
    const { name, email, auth0UserId } = req.body;

    // Validate required fields
    if (!name || !email || !auth0UserId) {
      return res.status(400).json({
        message: "Missing required fields: name, email, auth0UserId",
      });
    }

    const result = await userService.createUser({
      name,
      email,
      auth0UserId,
    });

    if (!result.success) {
      const statusCode = result.statusCode || 500;
      return res.status(statusCode).json({ message: result.error });
    }

    return res.status(201).json({
      message: `The user ${result.data?.name} was created`,
      data: result.data,
    });
  }

  // PATCH - Update user
  if (req.method === "PATCH") {
    const { email, town, profileText } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({
        message: "Missing required field: email",
      });
    }

    const result = await userService.updateUser(email, { town, profileText });

    if (!result.success) {
      return res.status(500).json({ message: result.error });
    }

    return res.status(200).json({
      message: `The user ${result.data?.name} updated`,
      data: result.data,
    });
  }

  return res.status(405).json({ message: "Method not allowed" });
};

export default users;
