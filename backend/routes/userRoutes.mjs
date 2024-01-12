import express from "express";

import {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
} from "../controllers/userController.mjs";

// create new router object
const router = express.Router();

// route to add new user
router.route("/").post(addUser);

// route to update user information
router.route("/:userId").put(updateUser);

// route to get all users
router.route("/getUsers").get(getUsers);

// route to delete user
router.route("/deleteUser/:userId").delete(deleteUser);

export default router;
