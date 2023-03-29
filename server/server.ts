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

const port = process.env.DEV_SERVER_PORT || 4000;

// const userSocketMap = new Map();
//
// io.on('connection', (socket: Socket) => {
//   const { userId } = socket.handshake.query;
//   const socketId = socket.id;
//   userSocketMap.set(userId, socketId);
//   Logger.info(`User ${userId} connected with socket ${socketId}`);
//
//   socket.on('disconnect', () => {
//     userSocketMap.delete(userId);
//     Logger.info(`User ${userId} disconnected`);
//   });
// });

server.listen(port, () => {
  Logger.info(`App listening on port ${port}`);
});

export default server;
