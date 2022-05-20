import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';
import blogService from '../services/blogs';
import { setBlogs } from '../reducers/blogsReducer';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const username = useSelector((state) => state.user.username);
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

  const handleLogout = () => {
    localStorage.removeItem('logginBlogApp');
    dispatch(setUser(null));
    dispatch(setNotification({ content: 'Logged out', type: 'success' }));
  };

  return (
    <div>
      <h2>Blogs</h2>
      <p>
        {username} logged in
        <button onClick={handleLogout}>Logout</button>
      </p>
      <Togglable buttonLabel="new note">
        <BlogForm />
      </Togglable>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} username={username} />
        ))}
    </div>
  );
};

export default Blogs;
