import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    applicantID: {
      type: String,
      ref: 'User',
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
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Application = mongoose.model('Application', applicationSchema);
export default Application;
