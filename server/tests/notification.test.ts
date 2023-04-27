import request from 'supertest';
import app from '../app';
import Notification from '../models/notificationModel';

const mockingoose = require('mockingoose');

jest.mock('../usingAuth', () => ({
  default: () => false,
  __esModule: true,
}));


describe('Notification routes', () => {
  describe('getUserNotifications', () => {
    it('should return all notifications for a user', async () => {
      const mockNotifications = [{
        _id: '60a91f84b1d07c0e8a2c7457',
        user_id: '123',
        initiator: { name: 'John', picture: 'https://example.com/john.png' },
      }, {
        _id: '60a91f84b1d07c0e8a2c7458',
        user_id: '123',
        initiator: { name: 'Mary', picture: 'https://example.com/mary.png' },
      }];
      mockingoose(Notification).toReturn(mockNotifications, 'find');
      const response = await request(app).get('/api/notifications/123');
      expect(response.status).toEqual(200);
      expect(response.body.status).toEqual('success');
    });

    it('should handle errors', async () => {
      mockingoose(Notification).toReturn(new Error('Some error occurred'), 'find');
      const response = await request(app).get('/api/notifications/123');
      expect(response.status).toEqual(400);
      expect(response.body.status).toMatch(/ERROR/);
      expect(response.body.message).toEqual('Failed to get user notifications');
    });
  });

  describe('getUnreadNotifications', () => {
    it('should return all unread notifications for a user', async () => {
      const mockNotifications = [{
        _id: '60a91f84b1d07c0e8a2c7457',
        user_id: '123',
        initiator: { name: 'John', picture: 'https://example.com/john.png' },
        isRead: false,
      }, {
        _id: '60a91f84b1d07c0e8a2c7458',
        user_id: '123',
        initiator: { name: 'Mary', picture: 'https://example.com/mary.png' },
        isRead: false,
      }];
      mockingoose(Notification).toReturn(mockNotifications, 'find');
      const response = await request(app).get('/api/notifications/123/unread');
      expect(response.status).toEqual(200);
      expect(response.body.status).toEqual('success');
    });

    it('should handle errors', async () => {
      mockingoose(Notification).toReturn(new Error('Some error occurred'), 'find');
      const response = await request(app).get('/api/notifications/123/unread');
      expect(response.status).toEqual(400);
      expect(response.body.status).toMatch(/ERROR/);
      expect(response.body.message).toEqual('Failed to get unread notifications');
    });
  });

  describe('sendNotification', () => {
    beforeEach(() => {
      mockingoose.resetAll();
    });

    it('should return a 201 status code with the created notification', async () => {
      const mockNotification = {
        user_id: '123',
        type: 'message',
        initiatorID: 'abc',
      };
      mockingoose(Notification).toReturn(mockNotification, 'create');
      const response = await request(app)
        .post('/api/notifications/123')
        .send({
          type: 'message',
          initiatorID: 'abc',
        });
      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
    });

    it('should return a 400 status code with an error message if the notification type is invalid', async () => {
      const response = await request(app)
        .post('/api/notifications/123')
        .send({
          type: 'invalid_type',
          initiatorID: 'abc',
        });
      expect(response.status).toBe(400);
      expect(response.body.status).toBe('failure');
      expect(response.body.message).toBe('Invalid notification type');
    });
  });

  describe('markAllNotifsRead', () => {
    it('should mark all notifications as read', async () => {
      const userId = 'test_user_id';
      mockingoose(Notification).toReturn(
        [{ _id: 'notification_id_1', isRead: false }, { _id: 'notification_id_2', isRead: false }],
        'find',
        { userId },
      );

      const response = await request(app)
        .patch(`/api/notifications/${userId}`)
        .expect(200);

      expect(response.body.status).toBe('success');
    });

    it('should return an error if there is an error in marking notifications as read', async () => {
      const userId = 'test_user_id';
      mockingoose(Notification).toReturn(new Error('Some error occurred'), 'updateMany');

      const response = await request(app)
        .patch(`/api/notifications/${userId}`)
        .expect(400);

      expect(response.body.status).toBe('ERROR Error: Some error occurred');
      expect(response.body.message).toBe('Failed to mark notification as read');
    });
  });

  describe('markMessagesRead', () => {
    beforeEach(() => {
      mockingoose.resetAll();
    });

    it('should mark all messages as read', async () => {
      const fakeUserId = 'fake-user-id';
      const fakeNotification = {
        _id: 'fake-notification-id',
        user_id: fakeUserId,
        type: 'message',
        isRead: false,
      };

      mockingoose.Notification.toReturn(fakeNotification, 'updateMany');
      const response = await request(app)
        .patch(`/api/notifications/${fakeUserId}/messages`)
        .expect(200);

      expect(response.body.status).toBe('success');
    });

    it('should handle errors when marking messages as read', async () => {
      const fakeUserId = 'fake-user-id';
      const errorMessage = 'Something went wrong';
      mockingoose.Notification.toReturn(new Error(errorMessage), 'updateMany');

      const response = await request(app)
        .patch(`/api/notifications/${fakeUserId}/messages`)
        .expect(400);

      expect(response.body.status).toBe(`ERROR Error: ${errorMessage}`);
      expect(response.body.message).toBe('Failed to mark notification as read');
    });
  });
});
