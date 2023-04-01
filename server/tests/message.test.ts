import request from 'supertest';
import app from '../app';
import Message from '../models/messageModel';
import Thread from '../models/threadModel';

const mockingoose = require('mockingoose');

jest.mock('../usingAuth', () => ({
  default: () => false,
  __esModule: true,
}));

describe('Message routes', () => {
  const threadId = 'test-thread-id';
  const senderId = 'test-sender-id';
  const messageText = 'test-message-text';
  let thread;
  let message: any;

  beforeEach(async () => {
    thread = await Thread.create({ _id: threadId, messages: [] });
    message = await Message.create({ senderID: senderId, threadID: threadId, text: messageText });

    mockingoose(Message).toReturn(message, 'find');
    mockingoose(Thread).toReturn(thread, 'findOneAndUpdate');
  });

  afterEach(async () => {
    await Thread.deleteOne({ _id: threadId });
    await Message.deleteOne({ _id: message._id });
  });

  describe('GET /threads/:thread_id/messages', () => {
    it('should return all messages in a thread', async () => {
      const response = await request(app).get(`/api/threads/${threadId}/messages`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
    });

    it('should return an error if the thread ID is invalid', async () => {
      mockingoose(Message).toReturn(new Error(), 'find');

      const invalidThreadId = 'invalid-thread-id';
      const response = await request(app).get(`/api/threads/${invalidThreadId}/messages`);

      expect(response.status).toBe(404);
      expect(response.body.status).toContain('ERROR');
      expect(response.body.message).toBe('Failed to get thread messages');
    });
  });

  describe('POST /threads/:thread_id/messages', () => {
    it('should create a new message in the thread', async () => {
      const response = await request(app)
        .post(`/api/threads/${threadId}/messages`)
        .send({ senderID: senderId, text: messageText });

      const newMessage = await Message.findOne({ _id: response.body.data.message._id });

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
    });

    it('should create a new message with an image in the thread', async () => {
      const response = await request(app)
        .post(`/api/threads/${threadId}/messages`)
        .field('senderID', senderId)
        .field('text', messageText)
        .attach('messageFile', 'public/img/users/backdropPic/default-backdrop.jpg');

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
    });

    it('should return an error if the thread ID is invalid', async () => {
      mockingoose(Thread).toReturn(new Error(), 'findOneAndUpdate');

      const invalidThreadId = 'invalid-thread-id';
      const response = await request(app)
        .post(`/api/threads/${invalidThreadId}/messages`)
        .send({ senderID: senderId, text: messageText });

      expect(response.status).toBe(400);
      expect(response.body.status).toContain('ERROR');
      expect(response.body.message).toBe('Failed to create message');
    });
  });
});
