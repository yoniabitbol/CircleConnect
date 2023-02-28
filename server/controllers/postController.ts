import { Request, Response } from 'express';
import Post from '../models/postModel';

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

const createPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.create(req.body);
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
    const post = await Post.findByIdAndUpdate(req.params.post_id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: `ERROR ${err}`,
      message: 'Error updating post',
    });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    await Post.findByIdAndDelete(req.params.post_id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: `ERROR ${err}`,
      message: 'Error deleting post',
    });
  }
};

export default {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
