"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    userName: { type: String, required: true },
    passWord: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    age: { type: String, required: true },
    skills: { type: String, required: true },
    profilePhoto: { type: String, required: true },
    careerGoals: { type: String, required: true },
    program: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Program",
        },
    ],
}, {
    timestamps: true,
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
