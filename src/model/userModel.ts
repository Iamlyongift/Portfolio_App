import mongoose from "mongoose";

interface UserType {
  userName: string;
  passWord: string;
  email: string;
  age: string;
  skills: string;
  profilePhoto: string;
  careerGoals: string;
  program: mongoose.Schema.Types.ObjectId[];
}

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    passWord: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    age: { type: String, required: true },
    skills: { type: String, required: true },
    profilePhoto: { type: String, required: true },
    careerGoals: { type: String, required: true },
    program: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserType>("User", userSchema);

export default User;
