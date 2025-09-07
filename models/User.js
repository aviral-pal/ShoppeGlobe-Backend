import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'] // name is required
  },
  email: {
    type: String,
    required: [true, 'Please provide email'], // email is required
    unique: true // no two users can have the same email
  },
  password: {
    type: String,
    required: [true, 'Please provide password'] // password is required
  }
}, { timestamps: true }); // adds createdAt and updatedAt

// Before saving: hash password if changed
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // skip if password not changed
  }
  const salt = await bcrypt.genSalt(10); // create salt
  this.password = await bcrypt.hash(this.password, salt); // hash password
  next();
});

// Compare entered password with stored hash
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create User model
const User = mongoose.model('User', userSchema);

// Export model
export default User;
