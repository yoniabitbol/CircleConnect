import { Server, Socket } from 'socket.io';
import { Logger } from './middleware/logger';
import server from './server';

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const userSocketMap = new Map();

io.on('connection', (socket: Socket) => {
  const { userId } = socket.handshake.query;
  const socketId = socket.id;
  userSocketMap.set(userId, socketId);
  Logger.info(`User ${userId} connected with socket ${socketId}`);

  socket.on('disconnect', () => {
    userSocketMap.delete(userId);
    Logger.info(`User ${userId} disconnected`);
  });
});
