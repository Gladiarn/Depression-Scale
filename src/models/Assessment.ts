import mongoose, {Document, Schema } from "mongoose";

interface IAssessment extends Document {
        lowest: number
        highest: number
        grade: string
}

const AssessmentSchema = new Schema<IAssessment>(

    {
        lowest: {type: Number, required:true},
        highest: {type: Number, required:true},
        grade: {type: String, required: true}
        
    }
)

const Assessment = mongoose.models.Assessment || mongoose.model<IAssessment>("Assessment", AssessmentSchema)

export default Assessment;