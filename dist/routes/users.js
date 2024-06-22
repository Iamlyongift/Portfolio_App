"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controller/userController");
const upoadImages_1 = require("../library/helpers/upoadImages");
const auth_1 = __importDefault(require("../middleware/auth"));
router.post("/register_user", upoadImages_1.upload.single("profilePhoto"), userController_1.RegisterUser);
router.post("/login", userController_1.loginUser);
router.put("/update_profile", auth_1.default, userController_1.updateProfile);
exports.default = router;
