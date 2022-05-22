import BlogCard from './BlogCard';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import blogService from '../services/blogs';
import { setBlogs } from '../reducers/blogsReducer';
import './Blogs.css';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const username = useSelector((state) => state.user.authenticated.username);
  const dispatch = useDispatch();
  // fetch blogs
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => dispatch(setBlogs(blogs)))
      .catch((e) => {
        dispatch(setNotification({ content: e.message, type: 'error' }));
        console.log(e);
      });
  }, [dispatch]);
  if (!blogs || !username) return null;
  return (
    <div className="blogs">
      <h2>Blogs</h2>
      <Togglable buttonLabel="new entry">
        <BlogForm />
      </Togglable>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default Blogs;
