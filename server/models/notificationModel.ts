import mongoose from 'mongoose';

// Database schema for notification documents
const notificationSchema = new mongoose.Schema({
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
}, {
  timestamps: true,
  versionKey: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

notificationSchema.virtual('initiator', {
  ref: 'User',
  localField: 'initiatorID',
  foreignField: 'user_id',
  justOne: true,
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
