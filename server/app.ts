import express, { Request, Response } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import userController from './controllers/userController';

const app = express();

app.use(express.json());

app.use('api/users', userController);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.all('*', (req, res) => {
  res.status(400).json({
    status: 'failure',
    message: `Cannot find ${req.originalUrl} on this server!`,
  });
});

export default app;
