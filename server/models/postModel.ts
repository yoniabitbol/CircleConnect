import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  postID: {
    type: String,
  },
  creatorID: {
    type: String,
    ref: 'User',
  },
  isJobListing: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
  },
  text: {
    type: String,
  },
  picture: {
    type: String,
  },
  likes: {
    type: Number,
  },
  comments: [{
    type: String,
  }],
  tags: [{
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
  }],
});

const Post = mongoose.model('Post', postSchema);
export default Post;
