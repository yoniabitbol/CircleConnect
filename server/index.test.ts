import request from 'supertest';
import app from './index';

describe('Example request test', () => {
  test('', (done) => {
    request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
