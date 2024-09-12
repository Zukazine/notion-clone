import prisma from "@/lib/prisma";
import { NextApiRequest,NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // 
  if (req.method === 'GET') {
    const { title } = req.body

    return title;
  }
}