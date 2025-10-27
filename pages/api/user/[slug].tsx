import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { userWithRelationsSelect } from 'lib/prisma/selects';

const getUserById = async (id: number) => {
  try {
    const findSingleUser = await prisma.user.findUnique({
      where: { id: id },
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

interface UserId {
  slug: string;
}

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { slug } = req.query as unknown as UserId;

    return new Promise((resolve) => {
      getUserById(parseInt(slug))
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
    console.log('Method not allowed in [slug].tsx');
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default user;
