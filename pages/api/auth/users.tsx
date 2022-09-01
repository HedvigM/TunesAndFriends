import { User } from '@auth0/auth0-react';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

interface User {
  name: string;
  email: string;
}

const prisma = new PrismaClient();

const addUser = async (user: User) => {
  try {
    const findSingleUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (findSingleUser === null) {
      const createResult = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
        },
      });
      if (createResult !== null) {
        return { message: `The user ${user.name} were created` };
      } else {
        return { message: 'Something went wrong while creating a user' };
      }
    } else {
      return { message: 'The user already exists' };
    }
  } catch (error) {
    console.log(error);
    return { message: 'An error were cathed in the terminal' };
  }
};

const listUsers = async () => {
  console.log('nu kör vi listUsers i APIt');

  try {
    const listUsersPrisma = await prisma.user.findMany();
    if (listUsersPrisma === null) {
      return { message: 'No users were returned' };
    } else {
      return {
        message: 'Det gick bra, här är användarna',
        data: listUsersPrisma,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

/* 
Todo:
- Find one user by id.
- update that users town or profileText info.
*/

/* const updateUser = async (user: User) => {
  try {
    const findSingleUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (findSingleUser !== null) {
      const createResult = await prisma.user.update({
        data: {
          town: user.town,
          profileText: user.profileText,
        },
      });
      if (createResult === null) {
        return { message: `The user ${user.name} were created` };
      } else {
        return { message: 'Something went wrong while creating a user' };
      }
    } else {
      return { message: 'The user already exists' };
    }
  } catch (error) {
    console.log(error);
    return { message: 'An error were cathed in the terminal' };
  }
}; */

const users = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return new Promise((resolve) => {
      const { name, email }: User = req.body;

      addUser({
        name,
        email,
      })
        .then((result) => {
          console.log('result', result);
          res.status(200).json(result);
          resolve('');
        })
        .catch((error) => {
          res.status(500).end(error);
          resolve('');
        })
        .finally(async () => {
          await prisma.$disconnect();
        });
    });
  } else if (req.method === 'GET') {
    return new Promise((resolve) => {
      listUsers()
        .then((result) => {
          console.log('result', result);
          res.status(200).json(result);
          resolve('');
        })
        .catch((error) => {
          res.status(500).end(error);
          resolve('');
        })
        .finally(async () => {
          await prisma.$disconnect();
        });
    });
  } else {
    res.status(404).end();
  }
};

export default users;
