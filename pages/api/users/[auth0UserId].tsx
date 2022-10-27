import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getUser = async (auth0UserId: string) => {
  console.log('API call', auth0UserId);
  try {
    const findSingleUser = await prisma.user.findUnique({
      where: { auth0UserId: auth0UserId },
      include: {
        knowTunes: true,
        starredTunes: true,
        following: true,
        followedBy: true,
      },
    });
    if (findSingleUser) {
      return {
        message: 'Det gick bra, här är användaren',
        data: findSingleUser,
      };
    } else {
      return { message: 'Något gick fel i hämtandet av användare' };
    }
  } catch (error) {
    console.log(error);
    return { message: 'Det blev ett error som fångades i terminalen' };
  }
};

interface UserAuth0 {
  auth0UserId: string;
}

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { auth0UserId } = req.query as unknown as UserAuth0;

    return new Promise((resolve) => {
      getUser(auth0UserId)
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
    console.log('fel i [email.tsx]');
    res.status(404).end();
  }
};

export default user;
