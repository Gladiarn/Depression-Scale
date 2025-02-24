import type { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "@/lib/mongodb";
import Analysis from "@/models/Analysis";
import Users from "@/models/Users";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Types } from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectDatabase();

        const session = await getServerSession(req, res, authOptions);

        console.log("Session:", session);
 
        if (!session || !session.user || !session.user.id) {
            return res.status(401).json({ message: "Unauthorized: No session or missing user ID" });
        }

        const UserId = new Types.ObjectId(session.user.id); 

        console.log("Extracted UserId:", UserId);

        const user = await Users.findById(UserId);



        if (!user) {
            return res.status(400).json({ message: "No user matches the current UserId" });
        }

        const analysis = await Analysis.find({UserId});

        return res.status(200).json(analysis);

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "SERVER FAILED", error });
    }
}
