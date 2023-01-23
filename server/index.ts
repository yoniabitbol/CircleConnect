import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
const port = 4000;

dotenv.config({ path: './../.env' });
const DB = process.env.DB as string;

if (DB) {
  mongoose.connect(DB).then(() => {
    console.log('Server-DB Connection Successful!');
  });
} else {
    console.log('No Server-DB Connection Specified!');
}

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
