import request from 'supertest';
import app from './app';
import User from './models/userModel';
import usingAuth from "./usingAuth";

const mockingoose = require('mockingoose');

jest.mock('./usingAuth', () => ({
  default: () => {return false;},
  __esModule: true,
}));

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

  test('Request default route', (done) => {
    request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('Request invalid route', (done) => {
    request(app)
      .get('/test')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });

//   test('', (done) => {
//     request(app)
//       .get('/api/users')
//       .then((response) => {
//         expect(response.statusCode).toBe(500);
//         expect(response.text).toBe('{"status":"error","message":"Get all users not implemented yet"}');
//         done();
//       });
//   });

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
          + '"testUser","name":"testUser","email":"testuser","_id":');
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
        expect(response.text).toContain('{"status":"success","data":{"user":{"user_id":"test","_id":');
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
      .get('/api/users')
      .send({user_id: 'test'})
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('{"status":"success","data":{"user":{"user_id":"testUser","name":' +
          '"testUser","email":"testuser","_id":');
        done();
      });
  });

  test('Request get user error', (done) => {
    mockingoose(User).toReturn(
      new Error(),
      'findOne',
    );

    request(app)
      .get('/api/users')
      .send({user_id: 'test'})
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toContain('{"status":"ERROR: Error","message":"error getting user"}');
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
      .send({user_id: 'test'})
      .then((response) => {
        expect(response.statusCode).toBe(201);
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
        expect(response.text).toContain('{"status":"ERROR: Error","message":"error updating user"}');
        done();
      });
  });
});
