import { useState } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';
import { useDispatch } from 'react-redux';
import { editBlog, removeBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
};

const Blog = ({ blog, username }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!expanded);
  const dispatch = useDispatch();

  const handleEdit = async (blog) => {
    try {
      const editedBlog = await blogService.modify({
        ...blog,
        likes: blog.likes + 1
      });
      dispatch(editBlog(editedBlog));
    } catch (e) {
      if (e.message) {
        console.log(e.message);
        dispatch(setNotification({ content: e.message, type: 'error' }));
      }
    }
  };
  const handleRemove = async (blog) => {
    const confirmMessage = `Remove Blog: ${blog.title} by ${
      blog.author || 'anon'
    }?`;
    if (!window.confirm(confirmMessage)) return;
    try {
      await blogService.remove(blog.id);
      dispatch(removeBlog(blog));
      dispatch(
        setNotification({
          content: `Removed: ${blog.title} by ${blog.author}`,
          type: 'success'
        })
      );
    } catch (e) {
      if (e.message) {
        console.log(e.message);
        dispatch(setNotification({ content: e.message, type: 'error' }));
      }
    }
  };
  return (
    <div style={blogStyle} data-cy="blog">
      <p>
        <span>{blog.title}</span>
        <span> by </span>
        <span>{blog.author || 'anon'}</span>
        <button onClick={toggleExpanded} data-cy="blog-toggle-view">
          {expanded ? 'hide' : 'view'}
        </button>
      </p>
      {expanded && (
        <div>
          <p>{blog.url}</p>
          <p>
            <span>likes: {blog.likes}</span>
            <button onClick={() => handleEdit(blog)} data-cy="blog-like-button">
              like
            </button>
          </p>
          <p>{blog.user.name}</p>
          {blog.user.username === username && (
            <button
              onClick={() => handleRemove(blog)}
              data-cy="blog-remove-button"
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.object
  }),
  username: PropTypes.string.isRequired
};

export default Blog;
