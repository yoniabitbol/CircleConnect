import multer from 'multer';
import sharp from 'sharp';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { Logger } from './logger';

const fileStorage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (file.mimetype.startsWith('image')
      || file.mimetype === 'application/pdf'
      || file.mimetype === 'application/vnd.ms-powerpoint'
      || file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      || file.mimetype === 'application/msword'
      || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      || file.mimetype === 'application/vnd.ms-excel'
      || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
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

  // Profile Images
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

  // User Resume and CV
  if (req.files.resume) {
    req.files.resume[0].filename = `resume-user-${
      req.body.user_id
    }-${Date.now()}.pdf`;
    const resume = req.files.resume[0];
    fs.writeFile(`public/files/users/resume/${req.files.resume[0].filename}`, resume.buffer, (err) => {
      if (err) {
        Logger.error(err);
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
        Logger.error(err);
      }
    });
  }

  // Post Images
  if (req.files.image) {
    req.files.image[0].filename = `post-user-${
      req.body.creatorID
    }-${Date.now()}.jpeg`;
    const image = req.files.image[0];
    sharp(image.buffer)
      .resize(2000, 1000)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/posts/${req.files.image[0].filename}`);
  }

  // Application Files
  if (req.files.applicationResume) {
    req.files.applicationResume[0].filename = `appResume-user-${
      req.body.applicantID
    }-${Date.now()}.pdf`;
    const applicationResume = req.files.applicationResume[0];
    fs.writeFile(`public/files/applications/resume/${req.files.applicationResume[0].filename}`, applicationResume.buffer, (err) => {
      if (err) {
        Logger.error(err);
      }
    });
  }

  if (req.files.applicationCoverLetter) {
    req.files.applicationCoverLetter[0].filename = `appCoverLetter-user-${
      req.body.applicantID
    }-${Date.now()}.pdf`;
    const applicationCoverLetter = req.files.applicationCoverLetter[0];
    fs.writeFile(`public/files/applications/coverLetter/${req.files.applicationCoverLetter[0].filename}`, applicationCoverLetter.buffer, (err) => {
      if (err) {
        Logger.error(err);
      }
    });
  }

  // Manage file extensions
  const getExtension = (mimeType: string) => {
    if (mimeType === 'application/vnd.ms-powerpoint') return 'ppt';
    if (mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') return 'pptx';
    if (mimeType === 'application/msword') return 'doc';
    if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return 'docx';
    if (mimeType === 'application/vnd.ms-excel') return 'xls';
    if (mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') return 'xlsx';
    return 'pdf';
  };

  // Message Files
  if (req.files.messageFile) {
    req.files.messageFile[0].filename = `msg-user-${
      req.body.senderID
    }-${Date.now()}.${getExtension(req.files.messageFile[0].mimetype)}`;
    const messageFile = req.files.messageFile[0];
    fs.writeFile(`public/files/messages/${req.files.messageFile[0].filename}`, messageFile.buffer, (err) => {
      if (err) {
        Logger.error(err);
      }
    });
  }

  return next();
};

const uploadFiles = upload.fields([
  { name: 'picture', maxCount: 1 },
  { name: 'backdrop', maxCount: 1 },
  { name: 'resume', maxCount: 1 },
  { name: 'coverLetter', maxCount: 1 },
  { name: 'image', maxCount: 1 },
  { name: 'applicationResume', maxCount: 1 },
  { name: 'applicationCoverLetter', maxCount: 1 },
  { name: 'messageFile', maxCount: 1 },
]);

export { uploadFiles, resizeFile };
