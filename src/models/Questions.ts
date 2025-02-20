import mongoose, {Document, Schema } from "mongoose";

interface IQuestions extends Document {
    category: string;
    description: string;
    scores: IScores;
}

interface IScores {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
}

const QuestionSchema = new Schema<IQuestions>(

    {
        category: {type: String, required:true},
        description: {type: String, required:true},
        scores: {
            0: {type: String, required: true},
            1: {type: String, required: true},
            2: {type: String, required: true},
            3: {type: String, required: true},
            4: {type: String, required: true},
        },
        
    }
)

const Questions = mongoose.models.Questions || mongoose.model<IQuestions>("Questions", QuestionSchema)

export default Questions;