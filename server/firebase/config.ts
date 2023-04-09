import admin from 'firebase-admin';
import dotenv from 'dotenv';
import usingAuth from '../usingAuth';

if (usingAuth()) {
  dotenv.config({ path: './../.env' });

  // Initialize Firebase Admin SDK
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SA as string)),
  });
}
export default admin;
