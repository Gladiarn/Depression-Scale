import type { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "@/lib/mongodb";
import Questions from "@/models/Questions";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  
  try {
    await connectDatabase();
    const questions = await Questions.find({});

    return res.status(200).json(questions);
    
  } catch (error) {
    console.error("Database Error:", error);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}
