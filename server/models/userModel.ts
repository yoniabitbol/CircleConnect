import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, 'User ID required.'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Name required.'],
  },
  email: {
    type: String,
    required: [true, 'Email required.'],
    unique: true,
    lowercase: true,
  },
  photo: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);
export default User;
