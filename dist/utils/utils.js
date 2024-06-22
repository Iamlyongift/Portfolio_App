"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProgramSchema = exports.createProgramSchema = exports.updateprofileSchema = exports.option = exports.LoginSchema = exports.RegisterSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.RegisterSchema = joi_1.default.object({
    userName: joi_1.default.string().required(),
    passWord: joi_1.default.string()
        .min(6)
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    confirm_password: joi_1.default.string()
        .valid(joi_1.default.ref("passWord"))
        .required()
        .label("confirm_password")
        .messages({ "any.only": "{{#label}} does not match" }),
    email: joi_1.default.string().email().required(),
    age: joi_1.default.string().required(),
    skills: joi_1.default.string().required(),
    profilePhoto: joi_1.default.string().required(),
    careerGoals: joi_1.default.string().required(),
});
exports.LoginSchema = joi_1.default.object({
    userName: joi_1.default.string().required(),
    passWord: joi_1.default.string()
        .min(6)
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
});
exports.option = {
    abortearly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
exports.updateprofileSchema = joi_1.default.object({
    skills: joi_1.default.string(),
    careerGoals: joi_1.default.string(),
});
exports.createProgramSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    duration: joi_1.default.string().required(),
    scholarship_available: joi_1.default.boolean().required(),
});
exports.updateProgramSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    duration: joi_1.default.string().required(),
    scholarship_available: joi_1.default.boolean().required(),
});
