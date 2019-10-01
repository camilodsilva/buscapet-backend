import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

import factory from '../factories';

import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should be not able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should encrypt user password when new user created', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should be able to update', async () => {
    const user = await factory.attrs('User', {
      email: 'camilodsmp@gmail.com',
      password: '123456',
    });

    await request(app)
      .post('/users')
      .send(user);

    const authenticationResponse = await request(app)
      .post('/sessions')
      .send(user);

    const { token } = authenticationResponse.body;

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send(user);

    expect(response.status).toBe(200);
  });
});
