import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config({ path: './../.env' });
const DB = process.env.DB as string;

mongoose.set('strictQuery', false);
mongoose.connect(DB).then(() => {
  console.log('Server-DB Connection Successful!');
});

const port = 4000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
