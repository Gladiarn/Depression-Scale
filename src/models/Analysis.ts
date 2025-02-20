import mongoose, {Document, Schema } from "mongoose";

interface IAnalysis extends Document{
    UserId: string
    Surveyscore: number
    Assessment: string
    Date: Date
}


const AnalysisSchema = new Schema<IAnalysis>(

    {
        UserId: {type: String, required: true},
        Surveyscore: {type: Number, required: true},
        Assessment: {type: String, required: true},
        Date: {type: Date, required: true},

    }

)

const Analysis = mongoose.models.Analysis || mongoose.model<IAnalysis>("Analysis", AnalysisSchema)

export default Analysis;


