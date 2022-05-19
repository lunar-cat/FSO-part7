import { useState } from 'react';
import PropTypes from 'prop-types';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
};

const Blog = ({ blog, handleEditBlog, handleRemoveBlog, username }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!expanded);
  const increaseLikes = () => {
    const editedBlog = { likes: blog.likes + 1 };
    handleEditBlog(editedBlog, { ...blog, likes: blog.likes + 1 });
  };
  const removeBlog = async () => {
    const confirmMessage = `Remove Blog: ${blog.title} by ${blog.author || 'anon'}?`;
    if (!window.confirm(confirmMessage)) return;
    handleRemoveBlog(blog);
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
      {expanded &&
        <div>
          <p>{blog.url}</p>
          <p>
            <span>likes: {blog.likes}</span>
            <button onClick={increaseLikes} data-cy="blog-like-button">like</button>
          </p>
          <p>{blog.user.name}</p>
          {blog.user.username === username &&
            <button onClick={removeBlog} data-cy="blog-remove-button">remove</button>
          }
        </div>
      }
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string.isRequired
    })
  }),
  username: PropTypes.string.isRequired,
  handleEditBlog: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired
};

export default Blog;