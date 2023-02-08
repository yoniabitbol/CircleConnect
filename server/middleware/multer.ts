// eslint-disable-next-line import/no-extraneous-dependencies
import multer from 'multer';
import { Request } from 'express';

const pictureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'picture') { cb(null, 'public/img/users/profilePic'); } else if (file.fieldname === 'backdrop') { cb(null, 'public/img/users/backdropPic'); }
  },
  filename(req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
    const ext = file.mimetype.split('/')[1];
    callback(null, `user-${req.body.user_id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req: Request, file: Express.Multer.File, callback: (error: (Error | null), acceptFile: boolean) => void) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage: pictureStorage,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fileFilter: multerFilter,
});

const uploadImages = upload.fields([{ name: 'picture', maxCount: 1 }, { name: 'backdrop', maxCount: 1 }]);

export default uploadImages;
