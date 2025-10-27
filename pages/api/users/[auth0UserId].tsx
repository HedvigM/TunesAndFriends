import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { userWithRelationsSelect } from 'lib/prisma/selects';

const getUser = async (auth0UserId: string) => {
  console.log('API call', auth0UserId);
  try {
    const findSingleUser = await prisma.user.findUnique({
      where: { auth0UserId: auth0UserId },
      select: userWithRelationsSelect,
    });
    if (findSingleUser) {
      return {
        message: 'User retrieved successfully',
        data: findSingleUser,
      };
    } else {
      return { message: 'User not found' };
    }
  } catch (error) {
    console.log(error);
    return { message: 'An error occurred while fetching the user' };
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
    console.log('Method not allowed in [auth0UserId].tsx');
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default user;
