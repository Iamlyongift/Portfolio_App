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
exports.deletePprogram = exports.updateProgram = exports.getSingleProgram = exports.getAllProgram = exports.createProgram = void 0;
const utils_1 = require("../utils/utils");
const programModel_1 = __importDefault(require("../model/programModel"));
const createProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verify = req.user;
        const validateUser = utils_1.createProgramSchema.validate(req.body, utils_1.option);
        if (validateUser.error) {
            return res
                .status(400)
                .json({ Error: validateUser.error.details[0].message });
        }
        const { name, description, duration, scholarship_available } = validateUser.value;
        const newProgram = yield programModel_1.default.create({
            name,
            description,
            duration,
            scholarship_available,
            user: verify._id,
        });
        res.status(201).json({ message: "program added successfully", newProgram });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createProgram = createProgram;
const getAllProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllProgram = yield programModel_1.default.find().populate("user");
        res.status(200).json({
            msg: "Program sucessfully fetched",
            getAllProgram,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllProgram = getAllProgram;
const getSingleProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const program = yield programModel_1.default.findById(id);
        if (!program) {
            return res.status(400).json({
                msg: "program not found",
            });
        }
        res.status(200).json({
            msg: "program sucessfully fetched",
            program,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getSingleProgram = getSingleProgram;
const updateProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const validateUser = utils_1.updateProgramSchema.validate(req.body, utils_1.option);
        if (validateUser.error) {
            return res
                .status(400)
                .json({ Error: validateUser.error.details[0].message });
        }
        const program = yield programModel_1.default.findById(id);
        if (!program) {
            return res.status(400).json({
                error: "program not found",
            });
        }
        const updateRecord = yield programModel_1.default.findByIdAndUpdate(id, Object.assign({}, req.body), {
            new: true,
            runValidators: true,
            context: "query",
        });
        if (!updateRecord) {
            return res.status(404).json({
                msg: "program not updated",
            });
        }
        return res.status(200).json({
            message: "program updated successfully",
            updateRecord,
        });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "An error occurred while updating the program" });
    }
});
exports.updateProgram = updateProgram;
const deletePprogram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const program = yield programModel_1.default.findByIdAndDelete(id);
        if (!program) {
            return res.status(404).json({
                message: "program not found",
            });
        }
        res.status(200).json({
            message: "program successfully deleted",
            program,
        });
    }
    catch (error) {
        console.log("Problem deleting program");
    }
});
exports.deletePprogram = deletePprogram;
