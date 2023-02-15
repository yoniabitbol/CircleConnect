import request from 'supertest';
import app from './app';
import User from './models/userModel';

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

  test('Request create user for already existing user', (done) => {
    mockingoose(User).toReturn(
      { user_id: 'testUser', name: 'testUser', email: 'testUser' },
      'findOne',
    );

    request(app)
      .post('/api/users')
      .send({ user_id: 'test' })
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
      .send({ user_id: 'test' })
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
      { user_id: 'testUser', name: 'testUser', email: 'testUser' },
      'findOne',
    );

    request(app)
      .get('/api/users/:user_id')
      .send({ user_id: 'test' })
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
      .send({ user_id: 'test' })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toContain('{"status":"ERROR: Error","message":"error getting user"}');
        done();
      });
  });

  test('Request get all users', (done) => {
    mockingoose(User).toReturn(
      { user_id: 'testUser', name: 'testUser', email: 'testUser' },
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
      { user_id: 'testUser', name: 'testUser', email: 'testUser' },
      'findOneAndUpdate',
    );

    request(app)
      .patch('/api/users')
      .send({ user_id: 'test', profile: { name: 'testProfile' } })
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
      .send({ user_id: 'test' })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('{"status":"ERROR: Error","message":"error updating user"}');
        done();
      });
  });

  test('Request delete user', (done) => {
    mockingoose(User).toReturn(
      { user_id: 'testUser', name: 'testUser', email: 'testUser' },
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
      .send({ user_id: 'test' })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('{"status":"ERROR: Error","message":"Error deleting user"}');
        done();
      });
  });

  test('Request get user connections', (done) => {
    mockingoose(User).toReturn(
      { user_id: 'testUser', name: 'testUser', email: 'testUser' },
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
      { user_id: 'testUser', name: 'testUser', email: 'testUser' },
      'findOne',
    );

    request(app)
      .patch('/api/users/:user_id/connect')
      .send({ user_id: 'test' })
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
      .send({ user_id: 'testTargetId' })
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
      .send({ user_id: 'senderTestId' })
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
      .send({ user_id: 'test' })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('{"status":"ERROR: Error","message":"Error accepting connection request"}');
        done();
      });
  });

  test('Request to decline connection', (done) => {
    mockingoose(User).toReturn(
      { user_id: 'testUser', name: 'testUser', email: 'testUser' },
      'findOne',
    );

    request(app)
      .patch('/api/users/:user_id/decline')
      .send({ user_id: 'test' })
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
      .send({ user_id: 'test' })
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
      .send({ user_id: 'testUser' })
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
      .send({ user_id: 'test' })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('{"status":"ERROR: Error","message":"Error removing connection"}');
        done();
      });
  });
});
