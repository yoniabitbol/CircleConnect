import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  applicationID: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  applicantID: {
    type: String,
    ref: 'User',
  },
  postID: {
    type: String,
    ref: 'Post',
  },
  text: {
    type: String,
  },
  resume: {
    type: String,
  },
  coverLetter: {
    type: String,
  },
  existingInfo: {
    type: Boolean,
    default: false,
  },
});

const Application = mongoose.model('Application', applicationSchema);
export default Application;
