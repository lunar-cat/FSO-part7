const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', { blogs: 0, passwordHash: 0 });
  res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
  const body = req.body;
  const user = req.user;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id.toString());
  await user.save();
  // dont forget to populate the user as we do in GET "/" path
  await savedBlog.populate('user', { blogs: 0, passwordHash: 0 });
  res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (req, res) => {
  const user = req.user;
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(400).json({ error: 'blog id doesnt exists' });
  }
  console.log('userID', user._id.toString(), '\nblogID', blog.user._id.toString());
  if (user._id.toString() !== blog.user._id.toString()) {
    return res.status(403)
      .json({ error: 'blog user and auth user doesnt match' });
  }
  await Blog.findByIdAndDelete(req.params.id);
  user.blogs = user.blogs.filter(b => b._id.toString() !== blog._id.toString());
  await user.save();
  return res.status(204).end();
});

blogsRouter.put('/:id', async (req, res) => {
  const { likes } = req.body;
  if (likes === undefined) {
    const e = new Error('Likes property is missing');
    e.name = 'ValidationError';
    throw e;
  }
  const updatedBlog = await Blog
    .findByIdAndUpdate(req.params.id, { likes }, { new: true });
  res.json(updatedBlog);
});

module.exports = blogsRouter;