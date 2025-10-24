import { UserProfile } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

const addUser = async (user: UserProfile) => {
  try {
    const findSingleUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (findSingleUser === null) {
      const createResult = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          auth0UserId: user.auth0UserId as string,
        },
      });
      if (createResult !== null) {
        return { message: `The user ${user.name} was created` };
      } else {
        return { message: "Something went wrong while creating a user" };
      }
    } else {
      return { message: "The user already exists" };
    }
  } catch (error) {
    return { message: "An error was caught in the terminal" };
  }
};

const listUsers = async () => {
  try {
    const listUsersPrisma = await prisma.user.findMany();
    if (listUsersPrisma === null) {
      return { message: "No users were returned" };
    } else {
      return {
        message: "Users retrieved successfully",
        data: listUsersPrisma,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const listUsersWithTune = async (tuneId: number) => {
  try {
    const listUsersPrisma = await prisma.user.findMany({
      where: {
        knowTunes: {
          some: {
            sessionId: tuneId,
          },
        },
      },
    });

    console.log("Users with tune:", { listUsersPrisma });

    if (listUsersPrisma === null) {
      return { message: "No users were returned" };
    } else {
      return {
        message: "Users retrieved successfully",
        data: listUsersPrisma,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (email: string, town: string, profileText: string) => {
  try {
    const updateUser = await prisma.user.update({
      where: { email: email },
      data: { town: town, profileText: profileText },
    });

    if (updateUser !== null) {
      return { message: `The user ${updateUser.name} updated` };
    } else {
      return { message: "Something went wrong while creating a user" };
    }
  } catch (error) {
    console.log(error);
    return { message: "An error was caught in the terminal" };
  }
};

interface ListUsersWithTuneQuery {
  tuneId: string;
}

const users = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return new Promise((resolve) => {
      const { name, email, auth0UserId } = req.body;
      addUser({
        name,
        email,
        auth0UserId,
      })
        .then((result) => {
          console.log("result", result);
          res.status(200).json(result);
          resolve("");
        })
        .catch((error) => {
          res.status(500).end(error);
          resolve("");
        })
        .finally(async () => {
          await prisma.$disconnect();
        });
    });
  } else if (req.method === "GET") {
    return new Promise((resolve) => {
      const { tuneId } = req.query as unknown as ListUsersWithTuneQuery;
      const parsedTuneId = parseInt(tuneId, 10);

      if (tuneId !== undefined) {
        listUsersWithTune(parsedTuneId)
          .then((result) => {
            res.status(200).json(result);
            resolve("");
          })
          .catch((error) => {
            res.status(500).end(error);
            resolve("");
          })
          .finally(async () => {
            await prisma.$disconnect();
          });
      } else {
        listUsers()
          .then((result) => {
            res.status(200).json(result);
            resolve("");
          })
          .catch((error) => {
            res.status(500).end(error);
            resolve("");
          })
          .finally(async () => {
            await prisma.$disconnect();
          });
      }
    });
  }
  if (req.method === "PATCH") {
    return new Promise((resolve) => {
      const { email, town, profileText } = req.body;

      updateUser(email, town, profileText)
        .then((result) => {
          console.log("result", result);
          res.status(200).json(result);
          resolve("");
        })
        .catch((error) => {
          res.status(500).end(error);
          resolve("");
        })
        .finally(async () => {
          await prisma.$disconnect();
        });
    });
  } else {
    console.log("what the fuck");
    res.status(404).end();
  }
};

export default users;
