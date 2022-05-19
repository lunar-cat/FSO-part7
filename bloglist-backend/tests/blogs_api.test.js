const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');

const initialBlogs = helper.initialBlogs;
beforeEach(async () => {
  helper.userID = await helper.initializeDB();
  const response = await api.post('/api/login').send(helper.rootUser);
  const { token } = response.body;
  helper.token = token;
});

describe('get blogs', () => {
  test('as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    // usamos regex porque en verdad devuelve
    // "application/json; charset=utf-8"
  });
  test('all of them', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length);
  });
  test('with "id" property as unique identifier', async () => {
    const response = await api.get('/api/blogs');
    const blog = response.body[0];

    //expect(blog.id).toBeDefined();
    expect(blog).toHaveProperty('id');
  });
  test('with "user" property with the value of instanciated userID', async () => {
    const response = await api.get('/api/blogs');
    const blog = response.body[0];

    expect(blog).toHaveProperty('user', { id: helper.userID, username: 'root' });
  });
});

describe('post blog', () => {
  test('with valid id, can be added', async () => {
    const newBlog = {
      title: 'new blog',
      author: 'new blog author',
      url: 'new blog url',
      likes: 20
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${helper.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);

    const titles = blogsAtEnd.map(blog => blog.title);
    expect(titles).toContain(newBlog.title);
  });
  test('without likes property, default to 0', async () => {
    const newBlog = {
      title: 'new blog without likes',
      author: 'new blog author',
      url: 'new blog url'
    };

    const savedPost = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${helper.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(savedPost.body.likes).toBe(0);
  });
  test('without title and url, responds with code 400', async () => {
    const newBlog = {
      author: 'new blog author without title&&url',
      likes: 32
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${helper.token}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });
  test('without authentication token, fails to 401', async () => {
    const newBlog = {
      title: 'new blog',
      author: 'new blog author',
      url: 'new blog url',
      likes: 20
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401);
  });
});

describe('delete blog', () => {
  test('with valid id, returns 204', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${helper.token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const contents = blogsAtEnd.map(blog => blog.title);
    expect(contents).not.toContain(blogToDelete.title);
  });
  test('with invalid id, returns 400', async () => {
    const invalidId = await helper.nonExistingId();

    await api
      .delete(`/api/blogs/${invalidId}`)
      .set('Authorization', `Bearer ${helper.token}`)
      .expect(400);
  });
});

describe('update blog', () => {
  test('with valid content, returns updated blog', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToEdit = blogsAtStart[0];

    const response = await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .set('Authorization', `Bearer ${helper.token}`)
      .send({ ...blogToEdit, likes: 20 })
      .expect(200);

    const editedBlog = response.body;
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[0].likes).toBe(editedBlog.likes);
  });
  test('with missing content, responds with code 400', async () => {
    const invalidBlog = {
      author: 'blog without likes'
    };
    const blogsInDb = await helper.blogsInDb();
    const blogToEdit = blogsInDb[0];
    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .set('Authorization', `Bearer ${helper.token}`)
      .send(invalidBlog)
      .expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});