import mongoose from "mongoose";

interface ProgramType {
  name: string;
  description: string;
  duration: string;
  scholarship_available: Boolean;
  user: mongoose.Schema.Types.ObjectId[];
}

const programSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    scholarship_available: { type: Boolean, required: true },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Program = mongoose.model<ProgramType>("Program", programSchema);

export default Program;
