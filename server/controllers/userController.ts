import { Request, Response } from 'express';
import User from '../models/userModel';

// Will require some sort of authentication to get all users
// const getAllUsers = (req: Request, res: Response) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'Get all users not implemented yet',
//   });
// };

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ user_id: req.query.user_id });
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    res.status(400).json({
      status: `ERROR: ${err}`,
      message: 'error getting user',
    });
  }
};
const createUser = async (req: Request, res: Response) => {
  try {
    const checkUser = await User.findOne({ user_id: req.body.user_id });
    if (!checkUser) {
      const newUser = await User.create(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          user: newUser,
        },
      });
    } else {
      res.status(200).json({
        status: 'user exists',
        data: {
          user: checkUser,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: `ERROR: ${err}`,
      message: 'error adding user',
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const filter = { user_id: req.body.user_id };
    // if (req.files) {}
    const update = {
      title: req.body.title,
      location: req.body.location,
      phone: req.body.phone,
      website: req.body.website,
      connections: req.body.connections,
      summary: req.body.summary,
      projects: req.body.projects,
      skills: req.body.skills,
      experience: req.body.experience,
      education: req.body.education,
      languages: req.body.languages,
      awards: req.body.awards,
      courses: req.body.courses,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      picture: req.files.picture ? req.files.picture[0].filename : req.body.picture,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      backdrop: req.files.backdrop ? req.files.backdrop[0].filename : req.body.backdrop,
    };
    const updatedUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(201).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: `ERROR: ${err}`,
      message: 'error updating user',
    });
  }
};

// Add firebase admin to delete user once the request is made
// const deleteUser = (req: Request, res: Response) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'Delete user not implemented yet',
//   });
// };

export default {
  // getAllUsers,
  getUser,
  createUser,
  updateUser,
  // , deleteUser,
};
