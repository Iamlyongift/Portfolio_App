import { Request, Response } from "express";
import {
  createProgramSchema,
  option,
  updateProgramSchema,
} from "../utils/utils";
import Program from "../model/programModel";

export const createProgram = async (req: Request | any, res: Response) => {
  try {
    const verify = req.user;
    //validate the body
    const validateUser = createProgramSchema.validate(req.body, option);
    if (validateUser.error) {
      return res
        .status(400)
        .json({ Error: validateUser.error.details[0].message });
    }
    const { name, description, duration, scholarship_available } =
      validateUser.value;
    //create a new program entery in the database]
    const newProgram = await Program.create({
      name,
      description,
      duration,
      scholarship_available,
      user: verify._id, // Ensure user ID is associated with the program
    });
    // Respond with success message and the created room
    res.status(201).json({ message: "program added successfully", newProgram });
  } catch (error) {
    console.log(error);
  }
};

//getAllProgram
export const getAllProgram = async (req: Request, res: Response) => {
  try {
    const getAllProgram = await Program.find().populate("user");
    res.status(200).json({
      msg: "Program sucessfully fetched",
      getAllProgram,
    });
  } catch (error) {
    console.log(error);
  }
};

//getsingleProgram
export const getSingleProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const program = await Program.findById(id);

    if (!program) {
      return res.status(400).json({
        msg: "program not found",
      });
    }
    res.status(200).json({
      msg: "program sucessfully fetched",
      program,
    });
  } catch (error) {
    console.log(error);
  }
};

//updateProgram
export const updateProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate the request body
    const validateUser = updateProgramSchema.validate(req.body, option);
    if (validateUser.error) {
      return res
        .status(400)
        .json({ Error: validateUser.error.details[0].message });
    }

    // Check if the room exists
    const program = await Program.findById(id);
    if (!program) {
      return res.status(400).json({
        error: "program not found",
      });
    }

    // Update the program
    const updateRecord = await Program.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );

    if (!updateRecord) {
      return res.status(404).json({
        msg: "program not updated",
      });
    }

    return res.status(200).json({
      message: "program updated successfully",
      updateRecord,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating the program" });
  }
};

//delete program

export const deletePprogram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const program = await Program.findByIdAndDelete(id);

    if (!program) {
      return res.status(404).json({
        message: "program not found",
      });
    }

    res.status(200).json({
      message: "program successfully deleted",
      program,
    });
  } catch (error) {
    console.log("Problem deleting program");
  }
};
