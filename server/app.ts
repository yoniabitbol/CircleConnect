import express, { Request, Response } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import applicationRoutes from './routes/applicationRoutes';
import threadRoutes from './routes/threadRoutes';
import decodeToken from './middleware/decodeToken';
import Morgan from './middleware/morgan';
import usingAuth from './usingAuth';

const app = express();

// Middleware
app.use(express.json());
if (usingAuth()) {
  app.use(cors());
  app.use(decodeToken);
  app.use(Morgan);
}

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/threads', threadRoutes);

// Serve static assets in production
app.use(express.static('./public'));

// Handle requests to unknown routes
app.all('*', (req, res) => {
  res.status(400).json({
    status: 'failure',
    message: `Cannot find ${req.originalUrl} on this server!`,
  });
});

export default app;
