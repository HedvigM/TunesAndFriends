import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const addTune = async (tune: number, email: string, knowOrLearn: string) => {
  try {
    const findSingleTune = await prisma.tune.findUnique({
      where: { sessionId: tune },
    });

    if (knowOrLearn === 'know') {
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
          message: `The tune with id: ${tune} was updated or created`,
        };
      } else {
        return { message: 'Something went wrong while creating a user' };
      }
    }
    if (knowOrLearn === 'learn') {
      const createResult = await prisma.tune.upsert({
        where: {
          sessionId: tune,
        },
        update: {
          staredBy: {
            connect: [{ email: email }],
          },
        },
        create: {
          sessionId: tune,
          staredBy: {
            connect: [{ email: email }],
          },
        },
      });
      if (createResult !== null) {
        return {
          message: `The tune with id: ${tune} was updated or created`,
        };
      } else {
        return { message: 'Something went wrong while creating a user' };
      }
    }
  } catch (error) {
    console.log(error);
    return { message: 'An error was caught in the terminal' };
  }
};

const listStaredTunes = async () => {
  try {
    const listStaredTunes = await prisma.XXX.findMany();
    if (listStaredTunes === null) {
      return { message: 'No users were returned' };
    } else {
      return {
        message: 'Det gick bra, här är användarna',
        data: listStaredTunes,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const tune = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return new Promise((resolve) => {
      const { tune, email, knowOrLearn } = req.body;

      addTune(tune, email, knowOrLearn)
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
      listStaredTunes()
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
    console.log('what the fuck');
    res.status(404).end();
  }
};

export default tune;
