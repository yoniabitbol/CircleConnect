import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  postID: {
    type: String,
    required: [true, 'Post ID required.'],
  },
  creatorID: {
    type: String,
    ref: 'User',
    required: [true, 'Creator ID required.'],
  },
  isJobListing: {
    type: Boolean,
    required: [true, 'Specify if this is a Job Listing.'],
  },
  createdAt: {
    type: Date,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  likes: {
    type: String,
    ref: 'User',
    unique: true,
    default: [],
  },
  comments: [{
    type: String,
    default: [],
  }],
  preferenceTags: [{
    type: String,
  }],
  uploadDeadline: {
    type: Date,
  },
  isThirdParty: {
    type: Boolean,
  },
  requiredDocuments: [{
    type: String,
  }],
  applications: [{
    type: String,
    ref: 'Application',
  }],
});

const Post = mongoose.model('Post', postSchema);
export default Post;
