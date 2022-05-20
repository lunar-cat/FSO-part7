import { useState } from 'react';
import blogService from '../services/blogs';
import { useDispatch } from 'react-redux';
import { addBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';
import { closeTogglable } from '../reducers/togglableReducer';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const cleanInputs = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = { title, author, url };
    let message;
    try {
      const newBlog = await blogService.create(blog);
      dispatch(addBlog(newBlog));
      message = {
        content: `Created: ${blog.title} by ${blog.author}`,
        type: 'success'
      };
    } catch (e) {
      if (e.message) {
        console.log(e.message);
        message = { content: e.message, type: 'error' };
      }
    } finally {
      dispatch(setNotification(message));
      cleanInputs();
      dispatch(closeTogglable());
    }
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
export default BlogForm;
