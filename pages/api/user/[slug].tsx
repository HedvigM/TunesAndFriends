import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';

const getUserById = async (id: number) => {
  try {
    const findSingleUser = await prisma.user.findUnique({
      where: { id: id },
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
    console.log('fel i [slug.tsx]');
    res.status(404).end();
  }
};

export default user;
