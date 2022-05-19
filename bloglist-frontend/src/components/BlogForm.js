import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ handleCreateBlog, closeForm }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = { title, author, url };
    handleCreateBlog(blog);
    setTitle('');
    setAuthor('');
    setUrl('');
    closeForm();
  };
  return (
    <section>
      <h3>Create new</h3>
      <form onSubmit={handleSubmit} data-cy="blog-form">
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            data-cy="blog-title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            data-cy="blog-author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <input
            type="text"
            id="url"
            value={url}
            data-cy="blog-url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" data-cy="blog-button">
          Create
        </button>
      </form>
    </section>
  );
};

BlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired
};
export default BlogForm;
