import { useSelector, useDispatch } from 'react-redux';
import { useMatch } from 'react-router-dom';
import { editBlog } from '../reducers/blogsReducer';
import blogService from '../services/blogs';
import { setNotification } from '../reducers/notificationReducer';

const Comments = ({ blog }) => {
  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {blog.comments.map((comment, idx) => {
          return <li key={idx}>{comment}</li>;
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
    } catch (e) {
      if (e.message) {
        console.log(e.message);
        dispatch(setNotification({ content: e.message, type: 'error' }));
      }
    }
  };
  if (!blog) return null;
  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        <span>{blog.likes} likes</span>
        <button type="button" onClick={() => handleEdit(blog)}>
          like
        </button>
      </p>
      <p>added by {blog.user.username}</p>
      {blog.comments && <Comments blog={blog} />}
    </div>
  );
};
export default Blog;
