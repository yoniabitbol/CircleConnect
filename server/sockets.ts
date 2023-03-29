import { Server, Socket } from 'socket.io';
import { Logger } from './middleware/logger';
import server from './server';
import Thread from './models/threadModel';

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

  socket.on('send-message', async ({
    senderID, threadID, text, file,
  }) => {
    try {
      const thread = await Thread.findById(threadID);
      const recipient = thread?.participants.filter((id) => id !== senderID);
      const recipientId = userSocketMap.get(recipient);
      if (recipientId) {
        io.to(recipientId).emit('receive-message', {
          recipient,
          sender: userId,
          text,
          file,
        });
      }
    } catch (err) {
      Logger.error(err);
    }
  });
});
