import type { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "@/lib/mongodb";
import Users from "@/models/Users";
import Analysis from "@/models/Analysis";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    await connectDatabase();
    try {
        const {UserId, Surveyscore, Assessment, Date} = req.body;
        const user = await Users.findById(UserId);
        if(!user){
            return res.status(400).json({message: "No user found/Not logged in yet"})
        }

        if(!Surveyscore || !Assessment || !Date){
            return res.status(400).json({message: "Empty values are not allowed"})
        }

        const analysis = new Analysis({
            UserId,
            Surveyscore,
            Assessment,
            Date
        })

        await analysis.save();
        return res.status(200).json({message: "Successfully added a new record"})
        
    } catch (error) {
        return res.status(500).json({message: "Server Error occurred: ", error})
    }
}