import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';

const addTag = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return new Promise((resolve) => {
      const { tuneId, tagName } = req.body;

      if (!tuneId || !tagName) {
        res.status(400).json({ error: 'tuneId and tagName are required' });
        resolve('');
        return;
      }

      addTagToTune(tuneId, tagName)
        .then((result) => {
          console.log('Tag added:', result);
          res.status(200).json(result);
          resolve('');
        })
        .catch((error) => {
          console.error('Error adding tag:', error);
          res.status(500).json({ error: error.message });
          resolve('');
        })
        .finally(async () => {
          await prisma.$disconnect();
        });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

const addTagToTune = async (tuneId: number, tagName: string) => {
  try {
    // Find or create the tag
    let tag = await prisma.tag.findUnique({
      where: { name: tagName },
    });

    if (!tag) {
      tag = await prisma.tag.create({
        data: { name: tagName },
      });
    }

    // Connect the tag to the tune
    const updatedTune = await prisma.tune.update({
      where: { id: tuneId },
      data: {
        tags: {
          connect: { id: tag.id },
        },
      },
      include: {
        tags: true,
      },
    });

    return {
      message: `Tag "${tagName}" added to tune ${tuneId}`,
      tag: tag,
      tune: updatedTune,
    };
  } catch (error) {
    console.error('Error in addTagToTune:', error);
    throw error;
  }
};

export default addTag;

