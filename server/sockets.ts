import { Server, Socket } from 'socket.io';
import Thread from './models/threadModel';
import { Logger } from './middleware/logger';
import { createServer } from "http";

const userSocketMap = new Map();
const io = new Server();

// Socket.io event handlers
io.on('connection', (socket: Socket) => {
  const { userId } = socket.handshake.query;
  const socketId = socket.id;
  userSocketMap.set(userId, socketId);
  Logger.info(`User ${userId} connected with socket ${socketId}`);
  socket.on('disconnect', () => {
    userSocketMap.delete(userId);
    Logger.info(`User ${userId} disconnected`);
  });

  // Send message to recipient event handler
  socket.on('send-message', async ({
    senderID, threadID, text, file,
  }) => {
    try {
      const thread = await Thread.findById(threadID);
      Logger.info(`Message sent from ${senderID} to ${thread?.participants}`);
      const recipient = thread?.participants.filter((id) => id !== senderID)[0];
      const recipientId = userSocketMap.get(recipient);
      if (recipientId) {
        io.to(recipientId).emit('receive-message', {
          threadID,
          senderID: userId,
          text,
          file,
        });
      }
    } catch (err) {
      Logger.error(err);
    }
  });
});
export default io;
