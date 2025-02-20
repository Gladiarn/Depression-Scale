import mongoose from "mongoose"

const MONGO_URI:string | undefined = process.env.MONGO_URI;

if(!MONGO_URI){
    console.log("EMPTY");
    throw new Error("EMPTY URI");
}

let cachedConn: mongoose.Connection | null = null;
let cachedPromise: Promise<mongoose.Mongoose> | null = null;

export const connectDatabase = async (): Promise<mongoose.Mongoose>=>{

    if(cachedConn){
        console.log("Conection Already Exists");
        return mongoose;
    }

    if(!cachedPromise){
        cachedPromise = mongoose.connect(MONGO_URI).then((mongooseInstance) => {
            cachedConn = mongooseInstance.connection;
            return mongooseInstance;
        }).catch((error) => {
            console.error('Failed to connect to MongoDB, ',error);
            throw new Error('MongoDB Connection Failed');
        })
    }

    return cachedPromise;

}
