import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';

const addTune = async (tune: number, email: string, knowOrLearn: string) => {
  try {
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
          starredBy: {
            connect: [{ email: email }],
          },
        },
        create: {
          sessionId: tune,
          starredBy: {
            connect: [{ email: email }],
          },
        },
      });
      if (createResult !== null) {
        return {
          message: `The tune with id: ${tune} was updated or created`,
        };
      } else {
        return { message: 'Something went wrong updating or creating a tune' };
      }
    }
  } catch (error) {
    console.log(error);
    return { message: 'An error was caught in the terminal' };
  }
};

const tune = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("jag körs")
  if (req.method === 'GET') {
    return new Promise((resolve) => {
      const { auth0UserId } = req.query;
      if (!auth0UserId || typeof auth0UserId !== 'string') {
        res.status(400).json({ error: 'auth0UserId is required' });
        resolve('');
        return;
      }
      getTunesByAuth0UserId(auth0UserId)
        .then((result) => {
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
  }
  
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
  } else {
    res.status(404).end();
  }
};


const getTunesByAuth0UserId = async (auth0UserId: string) => {
  const tunes = await prisma.tune.findMany({
    where: {
      knowedBy: {
        some: {
          auth0UserId: auth0UserId
        }
      }
    },
    include: {
      tags: true,
    },
  });
  return tunes || [];
};


export default tune;
