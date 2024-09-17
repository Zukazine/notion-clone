// src/pages/api/documents.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const documents = await prisma.document.findMany({
        select: {
          id: true,
          title: true,
        },
      });

      res.status(200).json(documents);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch documents' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
