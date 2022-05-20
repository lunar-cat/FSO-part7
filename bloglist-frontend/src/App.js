import { useEffect } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import { setAuthUser } from './reducers/userReducer';
import { Route, Routes } from 'react-router-dom';
import Users from './components/Users';
import User from './components/User';
import Blog from './components/Blog';
import Nav from './components/Nav';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.authenticated);
  // relogin
  useEffect(() => {
    const userJSON = localStorage.getItem('logginBlogApp');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      dispatch(setAuthUser(user));
      blogService.setToken(user.token);
      dispatch(
        setNotification({
          content: `Relogged as ${user.username}`,
          type: 'success'
        })
      );
    }
  }, [dispatch]);

  if (user === null) {
    return (
      <>
        <Notification />
        <LoginForm />
      </>
    );
  }
  return (
    <>
      <Notification />
      <Nav />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<User />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/:id" element={<Blog />} />
      </Routes>
    </>
  );
};

export default App;
