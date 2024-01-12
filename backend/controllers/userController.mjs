import User from "../models/userModel.mjs";

// This function handles the creation of a new user in the database.
export const addUser = async (req, res) => {
  try {
    // Destructure the required fields from the request body.
    const {
      firstName,
      lastName,
      state,
      district,
      village,
      panNumber,
      aadhaarNumber,
    } = req.body;

    console.log(req.body)

    // Check if all the required fields are provided.
    if (
      !firstName ||
      !lastName ||
      !state ||
      !district ||
      !village ||
      !panNumber ||
      !aadhaarNumber
    ) {
      // If any field is missing, return a 400 Bad Request response.
      return res.status(400).json({ message: "Please fill all details." });
    }

    // finding the user if exist
    const userExist = await User.findOne({
      where: { aadhaarNumber: aadhaarNumber },
    });
    // if the userExists true returns user exists
    if (userExist) {
      return res.status(401).json({ message: "User already exists." });
    }

    // Attempt to create a new user with the provided details.
    const newUser = await User.create({
      firstName,
      lastName,
      state,
      district,
      village,
      panNumber,
      aadhaarNumber,
    });

    // If the user is created successfully, send a 201 Created response with the user details.
    if (newUser) {
      res
        .status(201)
        .json({ message: "Submitted successfully", user: newUser });
    } else {
      // If the user creation fails, send a 400 Bad Request response.
      res.status(400).json({ message: "User creation failed." });
    }
  } catch (error) {
    // If an error occurs during the process, send a 500 Internal Server Error response.
    res.status(500).json({ message: error.message, success: false });
  }
};

// This function retrieves all users from the database.
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve users", success: false });
  }
};

// This function updates a user's information in the database.
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const [updated] = await User.update(req.body, {
      where: { id: userId },
    });
    if (updated) {
      const updatedUser = await User.findByPk(userId);
      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user", success: false });
  }
};

// Delete a user from the database.
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deleted = await User.destroy({
      where: { id: userId },
    });
    if (deleted) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user", success: false });
  }
};
