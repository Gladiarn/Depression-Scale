import type { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "@/lib/mongodb";
import Users from "@/models/Users";
import bcrypt from "bcryptjs"

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    await connectDatabase();

    try {

        const { Firstname, Lastname, Username, Password} = req.body;

        if(!Firstname || !Lastname || !Username || !Password){
            return res.status(400).json({message: "Empty Values are not required here!"});
        }

        const existingUser = await Users.findOne({Username});

        if(existingUser){
            return res.status(400).json({message: "User already existing"});
        }

        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, saltRounds);

        const newUser = new Users({Firstname, Lastname, Username, Password:hashedPassword});
        await newUser.save();
        return res.status(200).json({message: "Successfully added a new record, ", user:newUser})

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Server Error or Failed"});
    }
}