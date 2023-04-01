import request from 'supertest';
import app from './app';
import Thread from './models/threadModel';
import User from './models/userModel';

const mockingoose = require('mockingoose');

jest.mock('./usingAuth', () => ({
  default: () => false,
  __esModule: true,
}));

describe('Thread routes', () => {
  const testThread = {
    participants: ['user1', 'user2'],
    messages: [
      {
        sender: 'user1',
        message: 'Hello, how are you?',
      },
      {
        sender: 'user2',
        message: 'I am doing well, thanks for asking!',
      },
    ],
  };

  const testUser1 = {
    user_id: 'test1',
    username: 'user1',
    email: 'user1@example.com',
    password: 'password123',
  };

  const testUser2 = {
    user_id: 'test2',
    username: 'user2',
    email: 'user2@example.com',
    password: 'password456',
  };

  beforeEach(async () => {
    mockingoose(Thread).toReturn(testThread, 'findOne').toReturn(testThread, 'find');

    mockingoose(User).toReturn(testUser1, 'findOne');
  });

  describe('GET /threads', () => {
    it('should return all messaging threads', async () => {
      const res = await request(app).get('/api/threads');
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('success');
    });

    it('should return an error if threads cannot be fetched', async () => {
      mockingoose(Thread).toReturn(new Error(), 'find');

      const res = await request(app).get('/api/threads');
      expect(res.statusCode).toEqual(404);
      expect(res.body.status).toEqual('ERROR Error');
      expect(res.body.message).toEqual('Failed to get all threads');
    });
  });

  describe('GET /threads/user/:user_id', () => {
    it('should return all threads for the specified user', async () => {
      const res = await request(app).get(`/api/threads/${testUser1.user_id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('success');
    });

    it('should return an error if the user cannot be found', async () => {
      mockingoose(User).toReturn(new Error(), 'findOne');

      const res = await request(app).get('/api/threads/invalid-user-id');
      expect(res.statusCode).toEqual(404);
      expect(res.body.status).toEqual('ERROR Error');
      expect(res.body.message).toEqual('Failed to get user threads');
    });
  });

  describe('POST /threads', () => {
    it('should create a new thread between two users', async () => {
      mockingoose(Thread).toReturn(false, 'findOne');

      const res = await request(app)
        .post('/api/threads')
        .send({ participant1: testUser1.user_id, participant2: testUser2.user_id });
      expect(res.statusCode).toEqual(201);
      expect(res.body.status).toEqual('success');
    });

    it('should return an existing thread if one already exists between the two users', async () => {
      const existingThread = testThread;
      const res = await request(app)
        .post('/api/threads')
        .send({ participant1: existingThread.participants[0], participant2: existingThread.participants[1] });
      expect(res.statusCode).toEqual(403);
      expect(res.body.status).toEqual('failure');
      expect(res.body.data.message).toEqual('Thread already exists');
    });

    it('failed to create thread', async () => {
      mockingoose(Thread).toReturn(new Error(), 'findOne');

      const res = await request(app)
        .post('/api/threads')
        .send({ participant1: testUser1.user_id, participant2: testUser2.user_id });
      expect(res.statusCode).toEqual(400);
      expect(res.body.status).toEqual('ERROR Error');
      expect(res.body.message).toEqual('Failed to create thread');
    });
  });
});
