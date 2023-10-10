import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const addRelation = async (addingEmail: string, addedEmail: string) => {
  try {
    const createResult = await prisma.user.update({
      where: { email: addingEmail },
      data: {
        following: {
          connect: {
            email: addedEmail,
          },
        },
      },
    });
    if (createResult !== null) {
      return { message: `The relation was created` };
    } else {
      return { message: "Something went wrong while creating the relation" };
    }
  } catch (error) {
    console.log(error);
    return { message: "An error was caught in the terminal" };
  }
};
const deleteRelation = async (user: string, unFriendedUser: string) => {
  try {
    const createResult = await prisma.user.update({
      where: { auth0UserId: user },
      data: {
        following: {
          disconnect: {
            auth0UserId: unFriendedUser,
          },
        },
      },
    });
    if (createResult !== null) {
      return { message: `The relation was deleted` };
    } else {
      return { message: "Something went wrong while deleting the relation" };
    }
  } catch (error) {
    console.log(error);
    return { message: "An error was caught in the terminal" };
  }
};

const relation = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (req.body.relation === "delete") {
      return new Promise((resolve) => {
        const { user, unFriendedUser } = req.body;

        deleteRelation(user, unFriendedUser)
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
      return new Promise((resolve) => {
        const { addingEmail, addedEmail } = req.body;

        addRelation(addingEmail, addedEmail)
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
    }
  } else {
    console.log("what the fuck");
    res.status(404).end();
  }
};

export default relation;
