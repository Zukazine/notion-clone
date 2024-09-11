import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { user } = req.body;

    try {
      const existingUser = await prisma.user.findUnique({
        where: { clerkId: user.id }
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            clerkId: user.id,
            email: user.emailAddresses[0].emailAddress,
            name: `${user.firstName} ${user.lastName}`
          }
        });
        res.status(200).json({ message: 'User created successfully' });
      } else {
        res.status(200).json({ message: 'User already exists' });
      }
    } catch (error) {
      console.error('Error saving user:', error);
      res.status(500).json({ error: 'Failed to save user' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
