import request from 'supertest';
import app from './app';

jest.mock('./usingAuth', () => ({
    default: false,
    __esModule: true,
}));

describe('Request default route', () => {
  test('', (done) => {
    request(app)
      .get('/')
      .set({ Authorization: "token: test" })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
