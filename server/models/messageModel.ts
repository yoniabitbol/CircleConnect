import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    senderID: {
      type: String,
      ref: 'User',
      required: [true, 'Sender ID required.'],
    },
    receiverID: {
      type: String,
      ref: 'User',
      required: [true, 'Receiver ID required.'],
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
