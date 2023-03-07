import mongoose from 'mongoose';

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
  text: {
    type: String,
    required: true,
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
  requiredDocuments: [{
    type: String,
  }],
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
  }],
}, {
  timestamps: true,
  versionKey: false,
});

const Post = mongoose.model('Post', postSchema);
export default Post;