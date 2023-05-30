import { UserProfile } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const addUser = async (user: UserProfile) => {
  try {
    const findSingleUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (findSingleUser === null) {
      const createResult = await prisma.user.create({
        data: {
          name: user.name,
          lastName: user.lastName as string,
          email: user.email,
          auth0UserId: user.auth0UserId as string,
          profilePicture: user.profilePicture as string,
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
        message: "Det gick bra, här är användarna",
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

    console.log("här är listUserPrisma:", { listUsersPrisma });

    if (listUsersPrisma === null) {
      return { message: "No users were returned" };
    } else {
      return {
        message: "Det gick bra, här är användarna",
        data: listUsersPrisma,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (
  id: string,
  name: string,
  lastName: string,
  email: string,
  gender: string,
  birthday: Date,
  town: string,
  profileText: string
) => {
  console.log(
    "API:",
    id,
    name,
    lastName,
    email,
    gender,
    birthday,
    town,
    profileText
  );
  try {
    const updateUser = await prisma.user.update({
      where: { auth0UserId: id },
      data: {
        name: name,
        lastName: lastName,
        email: email,
        gender: gender,
        birthday: "2007-03-01T13:00:00Z",
        town: town,
        profileText: profileText,
      },
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
      const { name, email, auth0UserId, lastName, profilePicture } = req.body;
      addUser({
        name,
        email,
        auth0UserId,
        lastName,
        profilePicture,
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
      const { id, name, lastName, email, gender, birthday, town, profileText } =
        req.body;

      updateUser(id, name, lastName, email, gender, birthday, town, profileText)
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
