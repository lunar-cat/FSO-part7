import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BlogCardStyle = {
  padding: 1
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
    <article style={BlogCardStyle} data-cy="blog" className="blog-card">
      <p>
        <Link to={`/blogs/${blog.id}`}>
          <span>
            {blog.title.length <= 30
              ? blog.title
              : `${blog.title.slice(0, 30)}...`}
          </span>
          <span>{blog.author || 'anon'}</span>
        </Link>
      </p>
    </article>
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
