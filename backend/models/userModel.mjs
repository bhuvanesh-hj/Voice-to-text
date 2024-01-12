import mongoose from 'mongoose';

// Define the User schema with Mongoose.
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  state: String,
  district: String,
  village: String,
  panNumber: String,
  aadhaarNumber: Number,
}, {
  timestamps: true, // Automatically add createdAt and updatedAt timestamps
});

// Create the User model from the schema.
const User = mongoose.model('User', userSchema);

export default User;
