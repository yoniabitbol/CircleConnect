import request from 'supertest';
import app from './app';
import User from './models/userModel';
import Application from "./models/applicationModel";
import Post from "./models/postModel";
import Thread from './models/threadModel';
import Message from "./models/messageModel";

const mockingoose = require('mockingoose');

jest.mock('./usingAuth', () => ({
  default: () => false,
  __esModule: true,
}));

// jest.mock('./firebase/config', () => {
//   return {
//     initializeApp: () => {},
//     auth: async () => {
//       return {
//         deleteUser: async () => {return null;}
//       };
//     },
//     __esModule: true,
//   };
// });

describe('Server tests', () => {
  // test('Request auth error', (done) => {
  //   request(app)
  //     .get('/')
  //     .then((response) => {
  //       expect(response.statusCode).toBe(401);
  //       expect(response.text).toBe('{"status":"failure","message":"You are not authorized to ' +
  //         'access this route"}');
  //       done();
  //     });
  // });

  test('Request invalid route', (done) => {
    request(app)
      .get('/test')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
});

describe('User route tests', () => {
  test('Request create user for already existing user', (done) => {
    mockingoose(User).toReturn(
      {user_id: 'testUser', name: 'testUser', email: 'testUser'},
      'findOne',
    );

    request(app)
      .post('/api/users')
      .send({user_id: 'test'})
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('{"status":"user exists","data":{"user":{"user_id":'
          + '"testUser","name":"testUser","email":"testuser"');
        done();
      });
  });

  test('Request create user for non-existing user', (done) => {
    mockingoose(User).toReturn(
      null,
      'findOne',
    );

    request(app)
      .post('/api/users')
      .send({user_id: 'test'})
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.text).toContain('{"status":"success","data":{"user":{"user_id":"test"');
        done();
      });
  });

  test('Request create user no user specified error', (done) => {
    mockingoose(User).toReturn(
      new Error(),
      'findOne',
    );

    request(app)
      .post('/api/users')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('{"status":"ERROR: Error","message":"error adding user"}');
        done();
      });
  });

  test('Request get user', (done) => {
    mockingoose(User).toReturn(
      {user_id: 'testUser', name: 'testUser', email: 'testUser'},
      'findOne',
    );

    request(app)
      .get('/api/users/:user_id')
      .send({user_id: 'test'})
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('{"status":"success","data":{');
        done();
      });
  });

  test('Request get user error', (done) => {
    mockingoose(User).toReturn(
      new Error(),
      'findOne',
    );

    request(app)
      .get('/api/users/:user_id')
      .send({user_id: 'test'})
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toContain('{"status":"ERROR: Error","message":"error getting user"}');
        done();
      });
  });

  test('Request get all users', (done) => {
    mockingoose(User).toReturn(
      {user_id: 'testUser', name: 'testUser', email: 'testUser'},
      'find',
    );

    request(app)
      .get('/api/users')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('{"status":"success","data":{');
        done();
      });
  });

  test('Request get all users error', (done) => {
    mockingoose(User).toReturn(
      new Error(),
      'find',
    );

    request(app)
      .get('/api/users')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toContain('{"status":"ERROR: Error","message":"error getting users"}');
        done();
      });
  });

  test('Request update user', (done) => {
    mockingoose(User).toReturn(
      {user_id: 'testUser', name: 'testUser', email: 'testUser'},
      'findOneAndUpdate',
    );

    request(app)
      .patch('/api/users')
      .send({user_id: 'test', profile: {name: 'testProfile'}})
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('{"status":"success","data":{');
        done();
      });
  });

  test('Request update user error', (done) => {
    mockingoose(User).toReturn(
      new Error(),
      'findOneAndUpdate',
    );

    request(app)
      .patch('/api/users')
      .send({user_id: 'test'})
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('{"status":"ERROR: Error","message":"error updating user"}');
        done();
      });
  });

  test('Request delete user', (done) => {
    mockingoose(User).toReturn(
      {user_id: 'testUser', name: 'testUser', email: 'testUser'},
      'findOneAndDelete',
    );

    request(app)
      .delete('/api/users/test')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('{"status":"success","message":"User testUser deleted"}');
        done();
      });
  });

  test('Request delete user error', (done) => {
    mockingoose(User).toReturn(
      new Error(),
      'findOneAndDelete',
    );

    request(app)
      .delete('/api/users/:user_id')
      .send({user_id: 'test'})
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('{"status":"ERROR: Error","message":"Error deleting user"}');
        done();
      });
  });

  test('Request get user connections', (done) => {
    mockingoose(User).toReturn(
      {user_id: 'testUser', name: 'testUser', email: 'testUser'},
      'findOne',
    );

    mockingoose(User).toReturn(
      [],
      'find',
    );

    request(app)
      .get('/api/users/test/connections')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('{"status":"success","data":{"connections":[]}}');
        done();
      });
  });

  test('Request get user connections error', (done) => {
    mockingoose(User).toReturn(
      new Error(),
      'findOne',
    );

    request(app)
      .get('/api/users/:user_id/connections')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('{"status":"ERROR: Error","message":"Error getting user connections"}');
        done();
      });
  });

  test('Request get user incoming requests', (done) => {
    mockingoose(User).toReturn(
      {
        user_id: 'testUser', name: 'testUser', email: 'testUser', incomingRequests: 'testRequest',
      },
      'findOne',
    );

    mockingoose(User).toReturn(
      [],
      'find',
    );

    request(app)
      .get('/api/users/test/incoming')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('{"status":"success","data":{"requests":"No incoming requests"}}');
        done();
      });
  });

  test('Request get user incoming requests error', (done) => {
    mockingoose(User).toReturn(
      new Error(),
      'findOne',
    );

    request(app)
      .get('/api/users/test/incoming')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('{"status":"ERROR: Error","message":"Error getting incoming requests"}');
        done();
      });
  });

  test('Request get user outgoing requests', (done) => {
    mockingoose(User).toReturn(
      {
        user_id: 'testUser', name: 'testUser', email: 'testUser', incomingRequests: 'testRequest',
      },
      'findOne',
    );

    mockingoose(User).toReturn(
      [],
      'find',
    );

    request(app)
      .get('/api/users/:user_id/outgoing')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('{"status":"success","data":{"requests":"No outgoing requests"}}');
        done();
      });
  });

  test('Request get user outgoing requests error', (done) => {
    mockingoose(User).toReturn(
      new Error(),
      'findOne',
    );

    request(app)
      .get('/api/users/:user_id/outgoing')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('{"status":"ERROR: Error","message":"Error getting outgoing requests"}');
        done();
      });
  });

  test('Request to connect to user', (done) => {
    mockingoose(User).toReturn(
      {user_id: 'testUser', name: 'testUser', email: 'testUser'},
      'findOne',
    );

    request(app)
      .patch('/api/users/:user_id/connect')
      .send({user_id: 'test'})
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('{"status":"success","message"');
        done();
      });
  });

  test('Request to connect to user error', (done) => {
    mockingoose(User).toReturn(
      new Error(),
      'findOne',
    );

    mockingoose(User).toReturn(
      {},
      'updateOne',
    );

    request(app)
      .patch('/api/users/test/connect')
      .send({user_id: 'testTargetId'})
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('{"status":"ERROR: Error","message":"Error sending connection request"}');
        done();
      });
  });

  test('Request to accept connection', (done) => {
    mockingoose(User).toReturn(
      {
        user_id: 'testUser',
        name: 'testUser',
        email: 'testUser',
        connections: [],
        incomingRequests: ['testUser'],
        outgoingRequests: ['testUser'],
      },

      'findOne',
    );

    mockingoose(User).toReturn(
      {},

      'updateOne',
    );

    request(app)
      .patch('/api/users/test/accept')
      .send({user_id: 'senderTestId'})
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('{"status":"success","message":"Connection request accepted"}');
        done();
      });
  });

  test('Request to accept connection error', (done) => {
    mockingoose(User).toReturn(
      new Error(),
      'findOne',
    );

    request(app)
      .patch('/api/users/:user_id/accept')
      .send({user_id: 'test'})
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('{"status":"ERROR: Error","message":"Error accepting connection request"}');
        done();
      });
  });

  test('Request to decline connection', (done) => {
    mockingoose(User).toReturn(
      {user_id: 'testUser', name: 'testUser', email: 'testUser'},
      'findOne',
    );

    request(app)
      .patch('/api/users/:user_id/decline')
      .send({user_id: 'test'})
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('{"status":"success","message"');
        done();
      });
  });

  test('Request to decline connection error', (done) => {
    mockingoose(User).toReturn(
      new Error(),
      'findOne',
    );

    request(app)
      .patch('/api/users/:user_id/decline')
      .send({user_id: 'test'})
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('{"status":"ERROR: Error","message":"Error declining connection request"}');
        done();
      });
  });

  test('Request to remove connection', (done) => {
    mockingoose(User).toReturn(
      {
        user_id: 'testUser',
        name: 'testUser',
        email: 'testUser',
        connections: ['testUser'],
      },
      'findOne',
    );

    mockingoose(User).toReturn(
      {},
      'updateOne',
    );

    request(app)
      .patch('/api/users/test/remove')
      .send({user_id: 'testUser'})
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('{"status":"success","message":"Connection removed"}');
        done();
      });
  });

  test('Request to remove connection error', (done) => {
    mockingoose(User).toReturn(
      new Error(),
      'findOne',
    );

    request(app)
      .patch('/api/users/test/remove')
      .send({user_id: 'test'})
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('{"status":"ERROR: Error","message":"Error removing connection"}');
        done();
      });
  });
});

describe('Application route tests', () => {
  test('Request to get all applications', (done) => {
    request(app)
      .get('/api/applications')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('{"status":"success","data":{}}');
        done();
      });
  });

  test('Request to create applicatoon', (done) => {
    request(app)
      .post('/api/applications')
      .send({ user_id: 'test' })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.text).toContain('{"status":"success","data":{"application":{"existingInfo":false,"_id"');
        done();
      });
  });

  test('Request to get application', (done) => {
    request(app)
      .get('/api/applications/testid')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('{"status":"success","data":{}}');
        done();
      });
  });

  test('Request to update application', (done) => {
    mockingoose(Application).toReturn(
      {
      },
      'findByIdAndUpdate',
    );

    request(app)
      .patch('/api/applications/testid')
      .send({ user_id: 'test' })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('{"status":"success","data":{}}');
        done();
      });
  });

  test('Request to delete application', (done) => {
    mockingoose(Application).toReturn(
      {
      },
      'findByIdAndDelete',
    );

    request(app)
      .delete('/api/applications/testid')
      .send({ user_id: 'test' })
      .then((response) => {
        expect(response.statusCode).toBe(204);
        expect(response.text).toBe('');
        done();
      });
  });
});

describe('post routes', () => {
  afterEach(() => {
    mockingoose.resetAll();
  });

  describe('getAllPosts', () => {
    it('should return all posts', async () => {
      const mockPosts = [
        {
          _id: '611c5f5a5e5a0a00164b83bb',
          creatorID: '611c5f5a5e5a0a00164b83ba',
          isJobListing: true,
          position: 'Software Engineer',
          text: 'We are looking for an experienced software engineer to join our team!',
          preferenceTags: ['React', 'Node.js'],
          uploadDeadline: '2022-05-01T00:00:00.000Z',
          isThirdParty: false,
          requiredDocuments: [],
          createdAt: '2021-08-18T19:09:22.071Z',
          updatedAt: '2021-08-18T19:09:22.071Z',
        },
        {
          _id: '611c5f5a5e5a0a00164b83bc',
          creatorID: '611c5f5a5e5a0a00164b83ba',
          isJobListing: true,
          position: 'Frontend Developer',
          text: 'We are looking for a frontend developer to join our team!',
          preferenceTags: ['React', 'CSS'],
          uploadDeadline: '2022-05-01T00:00:00.000Z',
          isThirdParty: false,
          requiredDocuments: [],
          createdAt: '2021-08-18T19:09:22.071Z',
          updatedAt: '2021-08-18T19:09:22.071Z',
        },
      ];
      mockingoose(Post).toReturn(mockPosts, 'find');

      const response = await request(app).get('/api/posts');

      expect(response.status).toBe(200);
      expect(response.body.status).toEqual('success');
    });

    it('should return an error if there is an error getting posts', async () => {
      mockingoose(Post).toReturn(new Error(), 'find');

      const response = await request(app).get('/api/posts');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        status: 'ERROR Error',
        message: 'Error getting posts',
      });
    });
  });

  describe('GET /posts/:post_id', () => {
    it('should return a post by ID', async () => {
      mockingoose(Post).toReturn(null, 'findOne');

      const res = await request(app).get(`/api/posts/testID`);

      expect(res.statusCode).toEqual(200);
    });

    it('should return 400 if post ID is not a valid mongoose ID', async () => {
      mockingoose(Post).toReturn(new Error(), 'findOne');

      const res = await request(app).get('/api/posts/invalidID');

      expect(res.statusCode).toEqual(400);
      expect(res.body).toMatchObject({
        status: 'ERROR Error',
        message: 'Error getting post',
      });
    });
  });

  describe('POST /posts', () => {
    it('should create a new post', async () => {
      mockingoose(User).toReturn(null, 'findOne');

      const newPost = {
        title: 'Test Post',
        preferenceTags: 'test',
      };
      const response = await request(app)
        .post('/api/posts')
        .send(newPost)
        .expect(201);
      expect(response.body.status).toEqual('success');
    });

    it('cannot add tags if not job listing', async () => {
      mockingoose(User).toReturn(null, 'findOne');

      const newPost = {
        title: 'Test Post',
        preferenceTags: 'test',
        isJobListing: false,
        tags: ['test'],
      };
      const response = await request(app)
        .post('/api/posts')
        .send(newPost)
        .expect(403);
      expect(response.body.status).toEqual('failure');
      expect(response.body.message).toEqual('Cannot add tags if not a job listing');
    });

    it('Third party link is required if post is third part', async () => {
      mockingoose(User).toReturn(null, 'findOne');

      const newPost = {
        title: 'Test Post',
        preferenceTags: 'test',
        isThirdParty: true,
      };
      const response = await request(app)
        .post('/api/posts')
        .send(newPost)
        .expect(403);
      expect(response.body.status).toEqual('failure');
      expect(response.body.message).toEqual('Third party link is required if post is third party');
    });

    it('error creating post', async () => {
      mockingoose(User).toReturn(new Error(), 'findOne');

      const newPost = {
        title: 'Test Post',
        preferenceTags: 'test',
      };
      const response = await request(app)
        .post('/api/posts')
        .send(newPost)
        .expect(400);
      expect(response.body.status).toEqual('ERROR Error');
      expect(response.body.message).toEqual('Error creating post');
    });
  });

  describe('PUT /posts/:post_id', () => {
    const mockPost = {
      _id: '123abc',
      creatorID: 'user123',
      isJobListing: true,
      position: 'Software Engineer',
      text: 'This is a test post.',
      image: 'test.jpg',
      preferenceTags: 'software',
      uploadDeadline: '2023-05-01T00:00:00.000Z',
      isThirdParty: false,
      requiredDocuments: ['resume'],
    };

    const mockUser = {
      user_id: 'user122',
      email: 'testuser@example.com',
      firstName: 'John',
      lastName: 'Doe',
    };

    it('should update a post if creatorID matches', async () => {
      const mockPost = {
        _id: '60680a8a4b4f4c11dbb507d1',
        creatorID: '12345',
        isJobListing: true,
        jobTitle: 'Test Job',
        text: 'This is a test job listing',
        image: 'test.jpg',
        preferenceTags: ['test'],
        uploadDeadline: new Date(),
        isThirdParty: false,
        requiredDocuments: [],
      };
      const mockUser = {
        user_id: '12345',
      };

      mockingoose(User).toReturn(mockUser, 'findOne');
      mockingoose(Post).toReturn(mockPost, 'findOne');

      const updatedPost = {
        creatorID: '12345',
        isJobListing: false,
        jobTitle: 'Updated Job Title',
        text: 'This is an updated job listing',
        image: 'updated.jpg',
        preferenceTags: ['updated'],
        uploadDeadline: new Date(),
        isThirdParty: true,
        requiredDocuments: [],
      };

      const response = await request(app)
        .patch(`/api/posts/${mockPost._id}`)
        .send(updatedPost)
        .expect(200);

      expect(response.body.status).toEqual('success');
    });

    it('should return failure if post not found', async () => {
      const mockUser = {
        user_id: '12345',
      };
      mockingoose(User).toReturn(mockUser, 'findOne');
      mockingoose(Post).toReturn(null, 'findOne');

      const response = await request(app)
        .patch(`/api/posts/60680a8a4b4f4c11dbb507d1`)
        .send({
          creatorID: '12345',
          isJobListing: false,
          jobTitle: 'Updated Job Title',
          text: 'This is an updated job listing',
          image: 'updated.jpg',
          preferenceTags: ['updated'],
          uploadDeadline: new Date(),
          isThirdParty: true,
          requiredDocuments: [],
        })
        .expect(404);

      expect(response.body.status).toEqual('failure');
      expect(response.body.message).toEqual('Post not found');
    });

    it('should return failure if user not found', async () => {
      const post = new Post({
        creatorID: '12345',
        isJobListing: true,
        position: 'Software Engineer',
        text: 'Test post',
        image: 'test.jpg',
        preferenceTags: ['test'],
        uploadDeadline: new Date(),
        isThirdParty: false,
        requiredDocuments: ['resume'],
      });
      await post.save();

      mockingoose(Post).toReturn({}, 'findOne');
      mockingoose(User).toReturn(null, 'findOne');

      const updatedPost = {
        creatorID: '12345',
        isJobListing: false,
        jobTitle: 'Software Developer',
        text: 'Updated test post',
        preferenceTags: 'updated tag',
      };
      const response = await request(app)
        .patch(`/api/posts/${post._id}`)
        .send(updatedPost)
        .expect(404);
      expect(response.body.status).toEqual('failure');
      expect(response.body.message).toEqual('User not found');
    });

    it('should return failure if user is not the creator of the post', async () => {
      mockingoose(User).toReturn(mockUser, 'findOne');
      mockingoose(Post).toReturn(mockPost, 'findOne');

      const response = await request(app)
        .patch(`/api/posts/${mockPost._id}`)
        .send({
          creatorID: mockUser.user_id,
          isJobListing: false,
          jobTitle: 'Test Job Title',
          text: 'Test Text',
          image: 'test.jpg',
          preferenceTags: 'test, tag',
          uploadDeadline: new Date(),
          isThirdParty: false,
          requiredDocuments: ['document1.pdf', 'document2.pdf'],
        })
        .expect(403);

      expect(response.body.status).toEqual('failure');
      expect(response.body.message).toEqual('You can only update your own posts');
    });

    it('should return failure when User.findOne throws an error', async () => {
      mockingoose(Post).toReturn({creatorID: 'user123'}, 'findOne');
      mockingoose(User).toReturn(new Error(), 'findOne');

      const updatedPost = {
        creatorID: 'user123',
        isJobListing: true,
        jobTitle: 'New Job Title',
        text: 'New post text',
        preferenceTags: 'new tags',
        uploadDeadline: new Date('2023-04-15'),
        isThirdParty: false,
        requiredDocuments: 'new documents',
      };
      const response = await request(app)
        .patch('/api/posts/testID')
        .send(updatedPost)
        .expect(400);
      expect(response.body.status).toEqual('ERROR Error');
      expect(response.body.message).toEqual('Error updating post');
    });
  });

  describe('DELETE /posts/:post_id', () => {
    // Add tests for deletePost here
  });

  describe('GET /posts', () => {
    // Add tests for getAllPosts here
  });

});

describe('Message routes', () => {
  const threadId = 'test-thread-id';
  const senderId = 'test-sender-id';
  const messageText = 'test-message-text';
  const messageImage = 'test-message-image';
  let thread;
  let message: any;

  beforeEach(async () => {
    thread = await Thread.create({_id: threadId, messages: []});
    message = await Message.create({senderID: senderId, threadID: threadId, text: messageText});

    mockingoose(Message).toReturn(message, 'find');
    mockingoose(Thread).toReturn(thread, 'findOneAndUpdate');
  });

  afterEach(async () => {
    await Thread.deleteOne({_id: threadId});
    await Message.deleteOne({_id: message._id});
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
        .send({senderID: senderId, text: messageText});

      const newMessage = await Message.findOne({_id: response.body.data.message._id});

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
        .send({senderID: senderId, text: messageText});

      expect(response.status).toBe(400);
      expect(response.body.status).toContain('ERROR');
      expect(response.body.message).toBe('Failed to create message');
    });
  });
});

describe('Application routes', () => {

  let testApplicationId: String;
  const testApplication = {
    applicantID: 'testapplicant123',
    postID: 'testpost123',
    resume: 'testresume.pdf',
    coverLetter: 'testcoverletter.pdf',
    existingInfo: 'testinfo',
  };

  const testPost = {
    jobTitle: 'Software Engineer',
    companyName: 'Acme Inc.',
    location: 'San Francisco, CA',
    jobDescription: 'We are looking for a talented software engineer to join our team...',
    isJobListing: true,
  };

  beforeEach(async () => {
    mockingoose(Application).toReturn(testApplication, 'find').toReturn(testApplication, 'findOne');

    mockingoose(Post).toReturn(testPost, 'findOne');

    mockingoose(User).toReturn({}, 'findOne');
  });

  describe('GET /applications', () => {
    it('should return all applications', async () => {
      await Application.create(testApplication);
      const res = await request(app).get('/api/applications');
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('success');
    });

    it('should return an error if no applications are found', async () => {
      mockingoose(Application).toReturn(new Error(), 'find');

      const res = await request(app).get('/api/applications');
      expect(res.statusCode).toEqual(404);
      expect(res.body.status).toContain('ERROR');
      expect(res.body.message).toEqual('Error getting applications');
    });
  });

  // Tests for the getApplication function
  describe('GET /applications/:application_id', () => {
    it('should return a single application', async () => {
      const newApplication = await Application.create(testApplication);
      const res = await request(app).get(`/api/applications/${newApplication._id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('success');
    });

    it('should return an error if application is not found', async () => {
      mockingoose(Application).toReturn(new Error(), 'findOne');

      const res = await request(app).get(`/api/applications/invalidID`);
      expect(res.statusCode).toEqual(400);
      expect(res.body.status).toContain('ERROR');
      expect(res.body.message).toEqual('Error getting application');
    });
  });

  // Tests for the createApplication function
  describe('POST /applications', () => {
    it('should create a new application', async () => {
      const res = await request(app).post('/api/applications').send(testApplication);
      expect(res.statusCode).toEqual(201);
      expect(res.body.status).toEqual('success');
      testApplicationId = res.body.data.application._id; // Save the application ID for use in later tests
    });
  });

// Tests for the updateApplication function
  describe('PUT /applications/:application_id', () => {
    it('should update an existing application', async () => {
      const updatedApplication = {
        applicantID: 'updatedapplicant123',
        postID: 'updatedpost123',
        resume: 'updatedresume.pdf',
        coverLetter: 'updatedcoverletter.pdf',
        existingInfo: 'updatedinfo',
      };
      await Application.create(testApplication);
      const res = await request(app).patch(`/api/applications/${testApplicationId}`).send(updatedApplication);
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('success');
    });

    it('should return an error if application is not found', async () => {
      mockingoose(Application).toReturn(new Error(), 'findOneAndUpdate');

      const res = await request(app).patch('/api/applications/invalidID').send(testApplication);
      expect(res.statusCode).toEqual(400);
      expect(res.body.status).toContain('ERROR');
      expect(res.body.message).toEqual('Error updating application');
    });
  });

// Tests for the deleteApplication function
  describe('DELETE /applications/:application_id', () => {
    it('should delete an existing application', async () => {
      await Application.create(testApplication);
      const res = await request(app).delete(`/api/applications/${testApplicationId}`);
      expect(res.statusCode).toEqual(204);
      expect(res.body).toEqual({});
    });
  });

  describe('patch /posts/:post_id/apply', () => {
    it('should create a new application for a job listing', async () => {
      const response = await request(app)
        .patch('/api/applications/123/apply')
        .send(testApplication)
        .expect(200);

      expect(response.body.status).toBe('success');
    });

    it('error post not found', async () => {
      mockingoose(Post).toReturn(false, 'findOne');

      const response = await request(app)
        .patch('/api/applications/123/apply')
        .send(testApplication)
        .expect(403);

      expect(response.body.status).toBe('failure');
      expect(response.body.message).toBe('Post not found');
    });

    it('error post not job listing', async () => {
      let testPostNonListing = testPost;
      testPostNonListing.isJobListing = false;
      mockingoose(Post).toReturn(testPostNonListing, 'findOne');

      const response = await request(app)
        .patch('/api/applications/123/apply')
        .send(testApplication)
        .expect(403);

      expect(response.body.status).toBe('failure');
      expect(response.body.message).toBe('Post is not a job listing');
    });

    it('error thrown sending application', async () => {
      mockingoose(User).toReturn(new Error(), 'findOne');

      const response = await request(app)
        .patch('/api/applications/123/apply')
        .send(testApplication)
        .expect(400);

      expect(response.body.status).toBe('ERROR Error');
      expect(response.body.message).toBe('Error sending application');
    });

  });

  describe('patch /applications/:application_id/withdraw', () => {
    it('should withdraw an application', async () => {
      const response = await request(app)
        .patch('/api/applications/123/withdraw')
        .send({ user_id: '456' })
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Application withdrawn successfully');
    });

    it('should return an error if application is not found', async () => {
      mockingoose(Application).toReturn(false, 'findOne');

      const response = await request(app)
        .patch('/api/applications/invalid-id/withdraw')
        .send({ user_id: '456' })
        .expect(403);

      expect(response.body.status).toBe('failure');
      expect(response.body.message).toBe('Application not found');
    });

    it('should return an error if there was error finding application', async () => {
      mockingoose(Application).toReturn(new Error(), 'findOne');

      const response = await request(app)
        .patch('/api/applications/invalid-id/withdraw')
        .send({ user_id: '456' })
        .expect(400);

      expect(response.body.status).toBe('ERROR Error');
      expect(response.body.message).toBe('Error withdrawing application');
    });
  });

});

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
    password: 'password123'
  };

  const testUser2 = {
    user_id: 'test2',
    username: 'user2',
    email: 'user2@example.com',
    password: 'password456'
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
        .send({participant1: testUser1.user_id, participant2: testUser2.user_id});
      expect(res.statusCode).toEqual(201);
      expect(res.body.status).toEqual('success');
    });

    it('should return an existing thread if one already exists between the two users', async () => {
      const existingThread = testThread;
      const res = await request(app)
        .post('/api/threads')
        .send({participant1: existingThread.participants[0], participant2: existingThread.participants[1]});
      expect(res.statusCode).toEqual(403);
      expect(res.body.status).toEqual('failure');
      expect(res.body.data.message).toEqual('Thread already exists');
    });

    it('failed to create thread', async () => {
      mockingoose(Thread).toReturn(new Error(), 'findOne');

      const res = await request(app)
        .post('/api/threads')
        .send({participant1: testUser1.user_id, participant2: testUser2.user_id});
      expect(res.statusCode).toEqual(400);
      expect(res.body.status).toEqual('ERROR Error');
      expect(res.body.message).toEqual('Failed to create thread');
    });
  });

});