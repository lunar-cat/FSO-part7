import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BlogCardStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
};

const BlogCard = ({ blog }) => {
  /*
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
  */
  return (
    <div style={BlogCardStyle} data-cy="blog">
      <p>
        <Link to={`/blogs/${blog.id}`}>
          <span>{blog.title}</span>
          <span> by </span>
          <span>{blog.author || 'anon'}</span>
        </Link>
      </p>
    </div>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.object
  })
};

export default BlogCard;
