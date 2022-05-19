const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');

const initialUser = helper.rootUser;

describe('when creating a user', () => {
  beforeEach(async () => {
    await helper.initializeDB();
  });
  test('if missing password, returns 400', async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: 'pepito'
    };
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtStart).toHaveLength(usersAtEnd.length);
  });
  test('if missing username, returns 400', async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      password: 'pepito1234'
    };
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtStart).toHaveLength(usersAtEnd.length);
  });
  test('and username is less than 3 chars, returns 400', async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: 'ab',
      password: 'pepito1234'
    };
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtStart).toHaveLength(usersAtEnd.length);
  });
  test('and password is less than 3 chars, returns 400', async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: 'pepito',
      password: 'ab'
    };
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtStart).toHaveLength(usersAtEnd.length);
  });
  test('and username is not unique, returns 400', async () => {
    const usersAtStart = await helper.usersInDb();

    await api
      .post('/api/users')
      .send(initialUser)
      .expect(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtStart).toHaveLength(usersAtEnd.length);
  });
  test('and valid user, returns 201', async () => {
    const usersAtStart = await helper.usersInDb();
    const validUser = {
      username: 'XpepitoX',
      password: 'pepito1234',
      name: 'pepito'
    };
    await api
      .post('/api/users')
      .send(validUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});