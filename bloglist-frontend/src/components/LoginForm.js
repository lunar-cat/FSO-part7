import { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    let message;
    try {
      const user = await loginService.login(username, password);
      dispatch(setUser(user));
      blogService.setToken(user.token);
      localStorage.setItem('logginBlogApp', JSON.stringify(user));
      message = {
        content: `Logged as ${user.username}`,
        type: 'success'
      };
    } catch (e) {
      console.log(e.message);
      message = {
        content: e.message,
        type: 'error'
      };
    } finally {
      setUsername('');
      setPassword('');
      dispatch(setNotification(message));
    }
  };
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin} data-cy="login-form">
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            data-cy="login-username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            data-cy="login-password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" data-cy="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
