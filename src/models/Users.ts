import mongoose, {Document, Schema } from "mongoose";

export interface IUsers extends Document {
        Firstname:string
        Lastname: string
        Username: string
        Password: string

}



const UsersSchema = new Schema<IUsers>(

    {
        Firstname: {type: String, required: true},
        Lastname: {type: String, required: true},
        Username: {type: String, required: true},
        Password: {type: String, required: false},

    }
)

const Users = mongoose.models.Users || mongoose.model<IUsers>("Users", UsersSchema)

export default Users;