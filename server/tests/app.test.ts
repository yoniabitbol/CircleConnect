import request from 'supertest';
import app from '../app';

jest.mock('../usingAuth', () => ({
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
  test('Request invalid route', (done) => {
    request(app)
      .get('/test')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
});
