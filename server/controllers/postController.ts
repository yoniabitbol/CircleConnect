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
    const post: any = await Post.findById(req.params.post_id);
    await post?.populate({ path: 'applications', model: 'Application' });
    await post?.populate('creator', 'name picture');
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
      position: req.body.position,
      text: req.body.text,
      image: req.files && req.files.image ? req.files.image[0].filename : req.body.image,
      preferenceTags: req.body.preferenceTags,
      uploadDeadline: req.body.uploadDeadline,
      isThirdParty: req.body.isThirdParty,
      thirdPartyLink: req.body.thirdPartyLink,
      isResumeRequired: req.body.isResumeRequired,
      isCoverLetterRequired: req.body.isCoverLetterRequired,
    });
    const user = await User.findOne({ user_id: req.body.creatorID });
    await user?.updateOne({ $push: { posts: post._id } });

    if (!post.isJobListing && req.body.tags) {
      return res.status(403).json({
        status: 'failure',
        message: 'Cannot add tags if not a job listing',
      });
    }

    if (post.isThirdParty && !post.thirdPartyLink) {
      return res.status(403).json({
        status: 'failure',
        message: 'Third party link is required if post is third party',
      });
    }

    return res.status(201).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: `ERROR ${err}`,
      message: 'Error creating post',
    });
  }
};

const updatePost = async (req: any, res: Response) => {
  try {
    const filter = ({ _id: req.params.post_id });
    const update = {
      creatorID: req.body.creatorID,
      isJobListing: req.body.isJobListing,
      position: req.body.jobTitle,
      text: req.body.text,
      image: req.files && req.files.image ? req.files.image[0].filename : req.body.image,
      preferenceTags: req.body.preferenceTags,
      uploadDeadline: req.body.uploadDeadline,
      isThirdParty: req.body.isThirdParty,
      requiredDocuments: req.body.requiredDocuments,
    };
    const post = await Post.findOne({ _id: req.params.post_id });
    const user = await User.findOne({ user_id: req.body.creatorID });

    if (!post) {
      return res.status(404).json({
        status: 'failure',
        message: 'Post not found',
      });
    }
    if (!user) {
      return res.status(404).json({
        status: 'failure',
        message: 'User not found',
      });
    }
    if (post?.creatorID === user?.user_id) {
      const updatedPost = await Post.findOneAndUpdate(filter, update, {
        new: true,
      });
      return res.status(200).json({
        status: 'success',
        data: {
          updatedPost,
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
    const post = await Post.findOne({ _id: req.params.post_id });
    const user = await User.findOne({ user_id: req.body.creatorID });
    if (post?.creatorID === req.body.creatorID) {
      await post?.deleteOne();
      await user?.updateOne({ $pull: { posts: req.params.post_id } });
      return res.status(200).json({
        status: 'success',
        message: 'Post deleted successfully',
      });
    }
    if (!post) {
      return res.status(403).json({
        status: 'failure',
        message: 'Post not found',
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
    const post = await Post.findOne({ _id: req.params.post_id });
    if (post?.likes?.includes(req.body.user_id)) {
      await post?.updateOne({ $pull: { likes: req.body.user_id } });
      return res.status(200).json({
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
    const post = await Post.findOne({ _id: req.params.post_id });
    await post?.updateOne({
      $push: {
        comments: {
          commenter: req.body.commenter,
          comment: req.body.comment,
        },
      },
    });
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

const getSocialFeed = async (req: Request, res: Response) => {
  try {
    const currentUser: any = await User.findOne({ user_id: req.params.user_id });
    const currentUserPosts = await Post.find({ creatorID: currentUser?.user_id }).populate('creator', 'name picture title');
    const connectionsPosts = await Promise.all(
      currentUser?.connections.map((connectionID: string) => Post.find({ creatorID: connectionID, isJobListing: false }).populate('creator', 'name picture title')),
    );
    const feedArray = currentUserPosts.concat(...connectionsPosts).sort((a: any, b: any) => b.createdAt - a.createdAt);
    const feed = feedArray.filter((post: any, index:number) => feedArray.findIndex((p: any) => p._id.toString() === post._id.toString()) === index);
    return res.status(200).json({
      status: 'success',
      data: feed,
    });
  } catch (err) {
    return res.status(400).json({
      status: `ERROR ${err}`,
      message: 'Error social getting feed',
    });
  }
};

const getJobFeed = async (req: Request, res: Response) => {
  try {
    const currentUser: any = await User.findOne({ user_id: req.params.user_id });
    const currentUserPosts = await Post.find({ creatorID: currentUser?.user_id }).populate('creator', 'name picture title');
    const recruiterPosts = await Promise.all(
      currentUser?.preferenceTags.map((preferenceTag: string) => Post.find({ preferenceTags: { $in: [preferenceTag] }, isJobListing: true }).populate('creator', 'name picture title')),
    );
    const feedArray = currentUserPosts.concat(...recruiterPosts).sort((a: any, b: any) => b.createdAt - a.createdAt);
    const feed = feedArray.filter((post: any, index: number) => feedArray.findIndex((p: any) => p._id.toString() === post._id.toString()) === index);
    return res.status(200).json({
      status: 'success',
      data: feed,
    });
  } catch (err) {
    return res.status(400).json({
      status: `ERROR ${err}`,
      message: 'Error job getting feed',
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
  getSocialFeed,
  getJobFeed,
};
