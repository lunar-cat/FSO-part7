import { useSelector, useDispatch } from 'react-redux';
import { useMatch } from 'react-router-dom';
import { editBlog } from '../reducers/blogsReducer';
import blogService from '../services/blogs';
import { setNotification } from '../reducers/notificationReducer';
import { useState } from 'react';
import './Blogs.css';

const Comments = ({ blog }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const addComment = async (e) => {
    e.preventDefault();
    const updatedBlog = await blogService.addComment(comment, blog.id);
    dispatch(editBlog(updatedBlog));
    setComment('');
  };
  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <div>
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button>add comment</button>
        </div>
      </form>
      <ul style={{ padding: 0 }}>
        {blog.comments.map((comment, idx) => {
          return (
            <li key={idx} className="comment">
              {comment}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Blog = () => {
  const dispatch = useDispatch();
  const { id } = useMatch('/blogs/:id').params;
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((blog) => blog.id === id);
  const handleEdit = async (blog) => {
    try {
      const editedBlog = await blogService.modify({
        ...blog,
        likes: blog.likes + 1
      });
      dispatch(editBlog(editedBlog));
      dispatch(setNotification({ content: 'blog liked', type: 'success' }));
    } catch (e) {
      if (e.message) {
        console.log(e.message);
        dispatch(setNotification({ content: e.message, type: 'error' }));
      }
    }
  };
  if (!blog) return null;
  return (
    <article className="blog">
      <h2 style={{ wordBreak: 'break-word' }}>{blog.title}</h2>
      <a href={blog.url} className="url">
        {blog.url}
      </a>
      <p className="likes">{blog.likes} likes</p>
      <p className="author">added by {blog.user.username}</p>
      <button type="button" onClick={() => handleEdit(blog)}>
        like
      </button>
      {blog.comments && <Comments blog={blog} />}
    </article>
  );
};
export default Blog;
