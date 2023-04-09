import mongoose from 'mongoose';

// Database schema for notification documents
const notificationSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      ref: 'User',
      required: [true, 'User ID required.'],
    },
    initiatorID: {
      type: String,
      ref: 'User',
      required: [true, 'Initiator ID required.'],
    },
    type: {
      type: String,
      required: [true, 'Notification type required.'],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
);

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
