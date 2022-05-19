const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const rootUser = {
  username: 'root',
  password: 'rootpassword1234'
};
const initialBlogs = [
  {
    title: 'titulo 1',
    author: 'autor 1',
    url: 'url 1',
    likes: 1
  },
  {
    title: 'titulo 2',
    author: 'autor 2',
    url: 'url 2',
    likes: 2
  }
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willrermovethissoon',
    url: 'url',
    likes: 33,
    author: 'deleted'
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const createUser = async () => {
  const passwordHash = await bcrypt.hash(rootUser.password, 10);
  const user = new User({ ...rootUser, passwordHash });
  await user.save();
  return user._id.toString();
};

const createBlogs = async (userID) => {
  const blogsWithUser = initialBlogs.map((blog) => ({ ...blog, user: userID }));
  const createdBlogs = await Blog.insertMany(blogsWithUser);
  const blogsIDs = createdBlogs.map((blog) => blog._id.toString());
  const user = await User.findById(userID);
  user.blogs = blogsIDs;
  await user.save();
};

const initializeDB = async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  const userID = await createUser();
  await createBlogs(userID);
  return userID;
};

module.exports = {
  rootUser,
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  initializeDB
};
