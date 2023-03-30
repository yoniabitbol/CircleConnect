import mongoose from 'mongoose';

// Database schema for message documents=
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
  {
    timestamps: true,
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

messageSchema.virtual('sender', {
  ref: 'User',
  localField: 'senderID',
  foreignField: 'user_id',
  justOne: true,
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
