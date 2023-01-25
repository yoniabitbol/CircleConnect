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
  profile: {
    photo: {
      type: String,
    },
    education: {
      type: String,
    },
    awards: {
      type: String,
    },
    work: {
      type: String,
    },
    contact_info: {
      phone_number: {
        type: String,
      },
      contact_email: {
        type: String,
      },
    },
    // connections: {
    //   type: Array if User IDs
    // },
    bio: {
      type: String,
    },
  },
});

const User = mongoose.model('User', userSchema);
export default User;
