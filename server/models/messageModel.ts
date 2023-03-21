import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    senderID: {
      type: String,
      ref: 'User',
      required: [true, 'Sender ID required.'],
    },
    threadID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thread',
      required: [true, 'Thread ID required.'],
    },
    text: {
      type: String,
    },
    file: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false },
);

const Message = mongoose.model('Message', messageSchema);
export default Message;
