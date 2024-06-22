"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const programController_1 = require("../controller/programController");
const router = express.Router();
router.post("/create_program", auth_1.default, programController_1.createProgram);
router.put("/update_program/:id", auth_1.default, programController_1.updateProgram);
router.get("/get_all_program", auth_1.default, programController_1.getAllProgram);
router.get("/get_single_program/:id", auth_1.default, programController_1.getSingleProgram);
router.delete("/delete_program/:id", auth_1.default, programController_1.deletePprogram);
exports.default = router;
