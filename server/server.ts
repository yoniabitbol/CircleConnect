import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config({ path: './../.env' });
const DB = process.env.DB as string;

const connectionOptions = {
  dbName: process.env.NODE_ENV,
};
mongoose.set('strictQuery', false);
mongoose.connect(DB, connectionOptions).then(() => {
  console.log('Server-DB Connection Successful!');
});

const port = 4100;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
