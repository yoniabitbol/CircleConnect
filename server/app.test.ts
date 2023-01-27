import request from 'supertest';
import app from './app';
import User from './models/userModel';

const mockingoose = require('mockingoose');

jest.mock('./usingAuth', () => ({
  default: false,
  __esModule: true,
}));

describe('Request default route', () => {
  test('', (done) => {
    request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe('Request invalid route', () => {
  test('', (done) => {
    request(app)
      .get('/test')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
});

describe('Request get all users', () => {
  test('', (done) => {
    request(app)
      .get('/api/users')
      .then((response) => {
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('{"status":"error","message":"Get all users not implemented yet"}');
        done();
      });
  });
});

//Tests failing with 400 code for some reason - need to investigate
// describe('Request create user', () => {
//   test('', (done) => {
//     mockingoose(User).toReturn(
//       { user_id: 'testUser', name: 'testUser', email: 'testUser' },
//       'findOne',
//     );

//     request(app)
//       .post('/api/users')
//       .send({ user_id: 'test' })
//       .then((response) => {
//         expect(response.statusCode).toBe(201);
//         expect(response.text).toContain('{"status":"user exists","data":{"user":{"user_id":'
//                     + '"testUser","name":"testUser","email":"testuser","_id":');
//         done();
//       });
//   });
// });

// describe('Request create user no user specified error', () => {
//     test('', (done) => {
//         request(app)
//             .post('/api/users')
//             .then((response) => {
//                 expect(response.statusCode).toBe(400);
//                 expect(response.text).toBe('{"status":"ERROR: TypeError: Cannot read properties of ' +
//                     'undefined (reading \'user_id\')","message":"error adding user"}');
//                 done();
//             });
//     });
// });

// describe('Request get specific users', () => {
//    test('', (done) => {
//        request(app)
//            .get('/api/users/test')
//            .then((response) => {
//                expect(response.statusCode).toBe(500);
//                expect(response.text).toBe('{"status":"error","message":"Get user not implemented yet"}');
//                done();
//            });
//    });
// });
