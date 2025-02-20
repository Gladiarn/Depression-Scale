import type { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "@/lib/mongodb";
import Assessment from "@/models/Assessment";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  
  try {
    await connectDatabase(); // Connect to MongoDB
    const assessment = await Assessment.find({}); // Fetch all documents

    return res.status(200).json(assessment);
  } catch (error) {
    console.error("Database Error:", error);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}
