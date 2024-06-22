import express = require("express");
import auth from "../middleware/auth";
import {
  createProgram,
  updateProgram,
  getAllProgram,
  getSingleProgram,
  deletePprogram,
} from "../controller/programController";
const router = express.Router();

/* GET home page. */
router.post("/create_program", auth, createProgram);
router.put("/update_program/:id", auth, updateProgram);
router.get("/get_all_program", auth, getAllProgram);
router.get("/get_single_program/:id", auth, getSingleProgram);
router.delete("/delete_program/:id", auth, deletePprogram);

export default router;
