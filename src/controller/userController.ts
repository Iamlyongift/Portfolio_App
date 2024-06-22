import { Request, Response } from "express";
import {
  RegisterSchema,
  LoginSchema,
  updateprofileSchema,
  option,
} from "../utils/utils";
import User from "../model/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinaryV2 } from "cloudinary";

const jwtsecret = process.env.JWT_SECRET as string;

export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const userName = req.body.userName;
    const passWord = req.body.passWord;
    const email = req.body.email;
    const age = req.body.age;
    const skills = req.body.skills;
    const profilePhoto = req.body.profilePhoto;
    const careerGoals = req.body.careerGoals;

    //validate user

    const validateUser = RegisterSchema.validate(req.body.option);

    if (validateUser.error) {
      res.status(400).json({ Error: validateUser.error.details[0].message });
    }
    //Hashing password
    const passwordHash = await bcrypt.hash(passWord, await bcrypt.genSalt(12));

    const existingUser = await User.findOne({ email: email });

    // Initialize a variable to store the picture URL
    let pictureUrl = "";

    // Check if a file was uploaded
    if (req.file) {
      // Upload the image to Cloudinary and retrieve its URL
      const result = await cloudinaryV2.uploader.upload(req.file.path);
      pictureUrl = result.secure_url; // Store the URL of the uploaded picture
    }
    //create admin logins
    if (!existingUser) {
      const newAdmin = await User.create({
        userName,
        passWord: passwordHash,
        email,
        age,
        skills,
        profilePhoto: pictureUrl,
        careerGoals,
      });
      return res.status(200).json({ msg: "Registeration sucessful", newAdmin });
    }
    res.status(400).json({ error: "user already exist" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "internal server error" });
  }
};

//login user

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { userName, passWord } = req.body;

    // Validate user input
    const { error } = LoginSchema.validate(req.body, option);
    if (error) {
      return res.status(400).json({ Error: error.details[0].message });
    }

    // Verify if user exists
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ error: "user not found" });
    }

    // Compare password
    const validUser = await bcrypt.compare(passWord, user.passWord);
    if (!validUser) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Generate token
    const token = jwt.sign({ _id: user._id }, jwtsecret, { expiresIn: "30d" });

    // Send response
    return res.status(200).json({
      msg: "Login Successful",
      User,
      token,
    });
  } catch (error) {
    console.error("Something went wrong logging in:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProfile = async (req: Request | any, res: Response) => {
  try {
    const { skills, careerGoals } = req.body;

    // Validate request body
    const { error, value } = updateprofileSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ Error: error.details.map((err: any) => err.message) });
    }

    // Construct update object
    const updateFields: any = {
      skills,
      careerGoals,
    };

    // Find and update the user profile using the authenticated user's ID
    const profile = await User.findByIdAndUpdate(req.user._id, updateFields, {
      new: true,
    });

    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated", profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
