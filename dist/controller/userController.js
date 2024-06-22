"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.loginUser = exports.RegisterUser = void 0;
const utils_1 = require("../utils/utils");
const userModel_1 = __importDefault(require("../model/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinary_1 = require("cloudinary");
const jwtsecret = process.env.JWT_SECRET;
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userName = req.body.userName;
        const passWord = req.body.passWord;
        const email = req.body.email;
        const age = req.body.age;
        const skills = req.body.skills;
        const profilePhoto = req.body.profilePhoto;
        const careerGoals = req.body.careerGoals;
        const validateUser = utils_1.RegisterSchema.validate(req.body.option);
        if (validateUser.error) {
            res.status(400).json({ Error: validateUser.error.details[0].message });
        }
        const passwordHash = yield bcryptjs_1.default.hash(passWord, yield bcryptjs_1.default.genSalt(12));
        const existingUser = yield userModel_1.default.findOne({ email: email });
        let pictureUrl = "";
        if (req.file) {
            const result = yield cloudinary_1.v2.uploader.upload(req.file.path);
            pictureUrl = result.secure_url;
        }
        if (!existingUser) {
            const newAdmin = yield userModel_1.default.create({
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "internal server error" });
    }
});
exports.RegisterUser = RegisterUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, passWord } = req.body;
        const { error } = utils_1.LoginSchema.validate(req.body, utils_1.option);
        if (error) {
            return res.status(400).json({ Error: error.details[0].message });
        }
        const user = yield userModel_1.default.findOne({ userName });
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }
        const validUser = yield bcryptjs_1.default.compare(passWord, user.passWord);
        if (!validUser) {
            return res.status(400).json({ error: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, jwtsecret, { expiresIn: "30d" });
        return res.status(200).json({
            msg: "Login Successful",
            User: userModel_1.default,
            token,
        });
    }
    catch (error) {
        console.error("Something went wrong logging in:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.loginUser = loginUser;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skills, careerGoals } = req.body;
        const { error, value } = utils_1.updateprofileSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res
                .status(400)
                .json({ Error: error.details.map((err) => err.message) });
        }
        const updateFields = {
            skills,
            careerGoals,
        };
        const profile = yield userModel_1.default.findByIdAndUpdate(req.user._id, updateFields, {
            new: true,
        });
        if (!profile) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated", profile });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
});
exports.updateProfile = updateProfile;
