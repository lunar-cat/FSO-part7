import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import { useState } from 'react';

const Blogs = ({
  blogs, username, handleLogout, handleCreateBlog,
  handleEditBlog, handleRemoveBlog
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const toggleFormOpen = () => setIsFormOpen(!isFormOpen);
  return (
    <div>
      <h2>Blogs</h2>
      <p>
        {username} logged in
        <button onClick={handleLogout}>Logout</button>
      </p>
      <Togglable
        isOpen={isFormOpen}
        toggleOpen={toggleFormOpen}
        buttonLabel="new note"
      >
        <BlogForm
          handleCreateBlog={handleCreateBlog}
          closeForm={toggleFormOpen}
        />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog}
            handleEditBlog={handleEditBlog}
            handleRemoveBlog={handleRemoveBlog}
            username={username} />
        )}
    </div>
  );
};

export default Blogs;