import express from "express";
const router = express.Router();
import {
  RegisterUser,
  loginUser,
  updateProfile,
} from "../controller/userController";
import { upload } from "../library/helpers/upoadImages";
import auth from "../middleware/auth";
/* GET users listing. */
router.post("/register_user", upload.single("profilePhoto"), RegisterUser);
router.post("/login", loginUser);
router.put("/update_profile", auth, updateProfile);

export default router;
