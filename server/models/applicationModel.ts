import mongoose from 'mongoose';

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
    // toObject: { virtuals: true },
    // toJSON: { virtuals: true },
  },
);

// applicationSchema.virtual('applicant', {
//   ref: 'User',
//   localField: 'applicantID',
//   foreignField: 'user_id',
//   justOne: true,
// });

const Application = mongoose.model('Application', applicationSchema);
export default Application;
