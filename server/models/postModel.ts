import mongoose from 'mongoose';

// Database schema for post documents
const postSchema = new mongoose.Schema({
  creatorID: {
    type: String,
    ref: 'User',
    required: [true, 'Creator ID required.'],
  },
  isJobListing: {
    type: Boolean,
    required: [true, 'Specify if this is a Job Listing.'],
  },
  position: {
    type: String,
  },
  text: {
    type: String,
    required: [true, 'Text required.'],
  },
  image: {
    type: String,
  },
  likes: [{
    type: String,
    ref: 'User',
    default: [],
  }],
  comments: [
    {
      commenter: {
        type: String,
        ref: 'User',
      },
      comment: {
        type: String,
      },
    },
  ],
  preferenceTags: [{
    type: String,
  }],
  uploadDeadline: {
    type: Date,
  },
  isThirdParty: {
    type: Boolean,
  },
  thirdPartyLink: {
    type: String,
  },
  isResumeRequired: {
    type: Boolean,
  },
  isCoverLetterRequired: {
    type: Boolean,
  },

  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
  }],
}, {
  timestamps: true,
  versionKey: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

postSchema.virtual('creator', {
  ref: 'User',
  localField: 'creatorID',
  foreignField: 'user_id',
  justOne: true,
});

const Post = mongoose.model('Post', postSchema);
export default Post;
