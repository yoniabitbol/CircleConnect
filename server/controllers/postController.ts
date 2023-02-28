import { Request, Response } from 'express';
import Post from '../models/postModel';
import User from '../models/userModel';

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: 'success',
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: `ERROR ${err}`,
      message: 'Error getting posts',
    });
  }
};

const getPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.post_id);
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: `ERROR ${err}`,
      message: 'Error getting post',
    });
  }
};

const createPost = async (req: any, res: Response) => {
  try {
    const post = await Post.create({
      creatorID: req.body.creatorID,
      isJobListing: req.body.isJobListing,
      text: req.body.text,
      image: req.files && req.files.image ? req.files.image[0].filename : req.body.image,
      preferenceTags: req.body.preferenceTags,
      uploadDeadline: req.body.uploadDeadline,
      isThirdParty: req.body.isThirdParty,
      requiredDocuments: req.body.requiredDocuments,
    });
    res.status(201).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: `ERROR ${err}`,
      message: 'Error creating post',
    });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findOne({ postID: req.params.post_id });
    if (post?.creatorID === req.body.user_id) {
      await post?.updateOne({ $set: req.body });
      return res.status(200).json({
        status: 'success',
        data: {
          post,
        },
      });
    }
    return res.status(403).json({
      status: 'failure',
      message: 'You can only update your own posts',
    });
  } catch (err) {
    return res.status(400).json({
      status: `ERROR ${err}`,
      message: 'Error updating post',
    });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findOne({ postID: req.params.post_id });
    if (post?.creatorID === req.body.user_id) {
      await post?.deleteOne();
      return res.status(200).json({
        status: 'success',
        message: 'Post deleted successfully',
      });
    }
    return res.status(403).json({
      status: 'failure',
      message: 'You can only delete your own posts',
    });
  } catch (err) {
    return res.status(400).json({
      status: `ERROR ${err}`,
      message: 'Error deleting post',
    });
  }
};

const likePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findOne({ postID: req.params.post_id });
    if (post?.likes?.includes(req.body.user_id)) {
      await post?.updateOne({ $pull: { likes: req.body.user_id } });
      return res.status(403).json({
        status: 'success',
        message: 'Post disliked successfully',
      });
    }
    await post?.updateOne({ $push: { likes: req.body.user_id } });
    return res.status(200).json({
      status: 'success',
      message: 'Post liked successfully',
    });
  } catch (err) {
    return res.status(400).json({
      status: `ERROR ${err}`,
      message: 'Error liking post',
    });
  }
};

const commentPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findOne({ postID: req.params.post_id });
    await post?.updateOne({ $push: { comments: req.body } });
    return res.status(200).json({
      status: 'success',
      message: 'Post commented successfully',
    });
  } catch (err) {
    return res.status(400).json({
      status: `ERROR ${err}`,
      message: 'Error commenting post',
    });
  }
};

const getFeed = async (req: Request, res: Response) => {
  try {
    const currentUser: any = await User.findById(req.params.user_id);
    const userPosts = await Post.find({ creatorID: currentUser?.user_id });
    const recruiterPosts = await Promise.all(
      currentUser.preferenceTags.map((tag: any) => Post.find({ preferenceTags: tag })),
    );
    const friendPosts = await Promise.all(
      currentUser.connections.map((connectionID: any) => Post.find({ creatorID: connectionID })),
    );
    res.status(200).json({
      status: 'success',
      data: {
        userPosts,
        recruiterPosts,
        friendPosts,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: `ERROR ${err}`,
      message: 'Error getting feed',
    });
  }
};

export default {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
  getFeed,
};
