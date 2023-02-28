// eslint-disable-next-line import/no-extraneous-dependencies
import multer from 'multer';
// eslint-disable-next-line import/no-extraneous-dependencies
import sharp from 'sharp';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';

const fileStorage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else if (file.mimetype === 'application/pdf') {
    callback(null, true);
  } else {
    callback(new Error('Invalid File Type! Please upload only images.'), false);
  }
};

const upload = multer({
  storage: fileStorage,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fileFilter: multerFilter,
});

const resizeFile = (req: any, res: Response, next: NextFunction) => {
  if (!req.files) {
    return next();
  }

  if (req.files.picture) {
    req.files.picture[0].filename = `pp-user-${
      req.body.user_id
    }-${Date.now()}.jpeg`;
    const picture = req.files.picture[0];
    sharp(picture.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/profilePic/${req.files.picture[0].filename}`);
  }

  if (req.files.backdrop) {
    req.files.backdrop[0].filename = `bd-user-${
      req.body.user_id
    }-${Date.now()}.jpeg`;
    const backdrop = req.files.backdrop[0];
    sharp(backdrop.buffer)
      .resize(1900, 1000)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/backdropPic/${req.files.backdrop[0].filename}`);
  }

  if (req.files.resume) {
    req.files.resume[0].filename = `resume-user-${
      req.body.user_id
    }-${Date.now()}.pdf`;
    const resume = req.files.resume[0];
    fs.writeFile(`public/files/users/resume/${req.files.resume[0].filename}`, resume.buffer, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  if (req.files.coverLetter) {
    req.files.coverLetter[0].filename = `coverLetter-user-${
      req.body.user_id
    }-${Date.now()}.pdf`;
    const coverLetter = req.files.coverLetter[0];
    fs.writeFile(`public/files/users/coverLetter/${req.files.coverLetter[0].filename}`, coverLetter.buffer, (err) => {
      if (err) {
        console.log(err);
      }
    });

    if (req.files.image) {
      req.files.image[0].filename = `post-user-${
        req.body.user_id
      }-${Date.now()}.jpeg`;
      const image = req.files.image[0];
      sharp(image.buffer)
        .resize(2000, 1000)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/users/profilePic/${req.files.image[0].filename}`);
    }
  }

  return next();
};

const uploadFiles = upload.fields([
  { name: 'picture', maxCount: 1 },
  { name: 'backdrop', maxCount: 1 },
  { name: 'resume', maxCount: 1 },
  { name: 'coverLetter', maxCount: 1 },
]);

export { uploadFiles, resizeFile };
