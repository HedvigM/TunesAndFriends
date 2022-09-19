import { UserProfile } from '@auth0/nextjs-auth0';
import { AddTaskRounded } from '@mui/icons-material';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const addTune = async (tune, email) => {
  try {
    const findSingleTune = await prisma.tune.findUnique({
      where: { sessionId: tune },
    });

    if (findSingleTune === null) {
      const createResult = await prisma.tune.upsert({
        where: {
          sessionId: tune,
        },
        update: {
          knowedBy: {
            connect: [{ email: email }],
          },
        },
        create: {
          sessionId: tune,
          knowedBy: {
            connect: [{ email: email }],
          },
        },
      });
      if (createResult !== null) {
        return {
          message: `The tune with id: ${tune} were created`,
        };
      } else {
        return { message: 'Something went wrong while creating a user' };
      }
    } else {
      return { message: 'The tune already exists' };
    }
  } catch (error) {
    console.log(error);
    return { message: 'An error was caught in the terminal' };
  }
};

const tune = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise((resolve) => {
    const { tune, email } = req.body;
    console.log('API', tune);

    addTune(tune, email)
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
};

export default tune;
