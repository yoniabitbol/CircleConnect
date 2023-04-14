import mongoose from 'mongoose';

// Database schema for thread documents
const threadSchema = new mongoose.Schema(
  {
    participants: [{
      type: String,
      ref: 'User',
    }],
    messages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    }],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Thread = mongoose.model('Thread', threadSchema);
export default Thread;
