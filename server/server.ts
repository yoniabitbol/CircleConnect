// eslint-disable-next-line import/no-extraneous-dependencies
import { Server, Socket } from 'socket.io';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import app from './app';
import { Logger } from './middleware/logger';

dotenv.config({ path: './../.env' });
const DB = process.env.DB as string;

const connectionOptions = {
  dbName: process.env.NODE_ENV,
};
mongoose.set('strictQuery', false);
mongoose.connect(DB, connectionOptions).then(() => {
  Logger.info('Server-DB Connection Successful!');
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const port = process.env.DEV_SERVER_PORT || 4000;

io.on('connection', (socket: Socket) => {
  const { userId } = socket.handshake.query;
  Logger.info(`Socket connected: ${userId}`);
  socket.on('disconnect', () => {
    Logger.info(`Socket disconnected: ${userId}`);
  });
});

server.listen(port, () => {
  Logger.info(`App listening on port ${port}`);
});

export default io;
