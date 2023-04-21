import request from 'supertest';
import Application from '../models/applicationModel';
import Post from '../models/postModel';
import User from '../models/userModel';
import app from '../app';

const mockingoose = require('mockingoose');

jest.mock('../usingAuth', () => ({
  default: () => false,
  __esModule: true,
}));

describe('Application routes', () => {
  let testApplicationId: string;
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

      const res = await request(app).get('/api/applications/invalidID');
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
    beforeEach(async () => {
      mockingoose(Application).toReturn(false, 'findOne');
    });

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
      const testPostNonListing = testPost;
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
