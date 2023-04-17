import mongoose from 'mongoose';

// Database schema for application documents
const applicationSchema = new mongoose.Schema(
  {
    applicantID: {
      type: String,
      ref: 'User',
      required: [true, 'Applicant ID required.'],
    },
    postID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: [true, 'Post ID required.'],
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
