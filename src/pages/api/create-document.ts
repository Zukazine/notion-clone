import prisma from "@/lib/prisma";
import { NextApiRequest,NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, title, content, parentDocument, coverImage, icon, isPublished } = req.body;

    try {
      const existingUser = await prisma.user.findUnique({
        where: { clerkId: userId },
      });

      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Create a new document
      const newDocument = await prisma.document.create({
        data: {
          title: title || 'Untitled',
          content: content || '',
          parentDocumentId: parentDocument,
          coverImage: coverImage || null,
          icon: icon || null,
          isPublished: isPublished || false,
          userId: existingUser.clerkId,
        },
      });

      res.status(200).json(newDocument);
    } catch (error) {
      console.error('Error creating document:', error);
      res.status(500).json({ error: 'Failed to create document' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}