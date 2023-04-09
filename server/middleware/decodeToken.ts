import { Request, Response, NextFunction } from 'express';
import admin from '../firebase/config';

// Decodes the token sent in the request header
async function decodeToken(req: Request, res:Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      status: 'failure',
      message: 'You are not authorized to access this route',
    });
  }
  const token = authorization.split(' ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.body.uid = decodedToken.uid;
    return next();
  } catch (err) {
    return res.status(401).json({
      status: 'failure',
      message: 'You are not authorized to access this route',
    });
  }
}

export default decodeToken;
