import { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const setMessage = (content, type) => {
    setNotification({ content, type });
    setTimeout(() => setNotification(null), 5000);
  };
  // fetch blogs
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .catch((e) => {
        setMessage('Error fetching blogs', 'error');
        console.log(e);
      });
  }, []);
  // relogin
  useEffect(() => {
    const userJSON = localStorage.getItem('logginBlogApp');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      blogService.setToken(user.token);
      setMessage(`Relogged as ${user.username}`, 'success');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login(username, password);
      setUser(user);
      blogService.setToken(user.token);
      localStorage.setItem('logginBlogApp', JSON.stringify(user));
      setMessage(`Logged as ${user.username}`, 'success');
    } catch (e) {
      setMessage(e.message, 'error');
    } finally {
      setUsername('');
      setPassword('');
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('logginBlogApp');
    setUser(null);
    setMessage('Logged out', 'success');
  };
  const handleCreateBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog);
      const updatedBlogs = blogs.concat(newBlog);
      setBlogs(updatedBlogs);
      setMessage(`Created: ${blog.title} by ${blog.author}`, 'success');
    } catch (e) {
      if (e.message) {
        console.log(e.message);
        setMessage(e.message);
      }
    }
  };
  const handleEditBlog = async (editedBlog, blog) => {
    try {
      await blogService.modify(editedBlog, blog.id);
      const updatedBlogs = blogs.map((b) => (b.id !== blog.id ? b : blog));
      setBlogs(updatedBlogs);
    } catch (e) {
      if (e.message) {
        console.log(e.message);
        setMessage(e.message);
      }
    }
  };
  const handleRemoveBlog = async (blog) => {
    try {
      await blogService.remove(blog.id);
      const updatedBlogs = blogs.filter((b) => b.id !== blog.id);
      setBlogs(updatedBlogs);
      setMessage(`Removed ${blog.title} blog.`, 'success');
    } catch (e) {
      if (e.message) {
        console.log(e.message);
        setMessage(e.message);
      }
    }
  };
  if (user === null) {
    return (
      <>
        <Notification message={notification} />
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUsername={({ target }) => setUsername(target.value)}
          handlePassword={({ target }) => setPassword(target.value)}
        />
      </>
    );
  } else {
    return (
      <>
        <Notification message={notification} />
        <Blogs
          blogs={blogs}
          username={user.username}
          handleLogout={handleLogout}
          handleCreateBlog={handleCreateBlog}
          handleEditBlog={handleEditBlog}
          handleRemoveBlog={handleRemoveBlog}
          setMessage={setMessage}
        />
      </>
    );
  }
};

export default App;
