// eslint-disable-next-line import/no-extraneous-dependencies
import multer from "multer";
// eslint-disable-next-line import/no-extraneous-dependencies
import sharp from "sharp";
import { NextFunction, Request, Response } from "express";

const pictureStorage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void
) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Not an image! Please upload only images."), false);
  }
};

const upload = multer({
  storage: pictureStorage,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fileFilter: multerFilter,
});

const resizePhoto = (req: any, res: Response, next: NextFunction) => {
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
      .toFormat("jpeg")
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
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/backdropPic/${req.files.backdrop[0].filename}`);
  }

  return next();
};

const uploadImages = upload.fields([
  { name: "picture", maxCount: 1 },
  { name: "backdrop", maxCount: 1 },
]);

export { uploadImages, resizePhoto };
