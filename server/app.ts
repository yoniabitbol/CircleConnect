import cors from 'cors';
import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';
import decodeToken from './middleware/decodeToken';
import usingAuth from './usingAuth';

const app = express();

app.use(express.json())

// if (usingAuth) {
//   app.use(express.json());
//   app.use(cors());
//   app.use(decodeToken);
// }

app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Default Route');
});

app.all('*', (req, res) => {
  res.status(400).json({
    status: 'failure',
    message: `Cannot find ${req.originalUrl} on this server!`,
  });
});

export default app;
