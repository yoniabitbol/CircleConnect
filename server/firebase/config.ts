// eslint-disable-next-line import/no-extraneous-dependencies
import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config({ path: './../.env' });

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SA as string)),
});
