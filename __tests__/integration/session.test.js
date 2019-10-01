import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';

import truncate from '../util/truncate';

describe('Session', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to login with an existing email and password', async () => {
    const user = await factory.attrs('User', {
      email: 'camilodsmp@gmail.com',
      password: '123456',
    });

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/sessions')
      .send(user);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not be able to login with an existing email and wrong password', async () => {
    const user = await factory.attrs('User', {
      email: 'camilodsmp@gmail.com',
      password: '123456',
    });

    const invalidPassword = await factory.attrs('User', {
      email: 'camilodsmp@gmail.com',
      password: 'abcdef',
    });

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/sessions')
      .send(invalidPassword);

    expect(response.status).toBe(401);
  });

  it('should not be able to login with a non existing email and correct password', async () => {
    const user = await factory.attrs('User', {
      email: 'camilodsmp@gmail.com',
      password: '123456',
    });

    const nonExistingUser = await factory.attrs('User', {
      email: 'non.existing@gmail.com',
      password: '123456',
    });

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/sessions')
      .send(nonExistingUser);

    expect(response.status).toHaveProperty('id');
  });
});
