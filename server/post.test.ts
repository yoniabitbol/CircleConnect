import request from 'supertest';
import app from './app';
import Post from './models/postModel';
import User from './models/userModel';

const mockingoose = require('mockingoose');

jest.mock('./usingAuth', () => ({
  default: () => false,
  __esModule: true,
}));

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

      const res = await request(app).get('/api/posts/testID');

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
        .patch('/api/posts/60680a8a4b4f4c11dbb507d1')
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
      mockingoose(Post).toReturn({ creatorID: 'user123' }, 'findOne');
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
