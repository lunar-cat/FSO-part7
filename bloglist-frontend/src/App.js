import { useEffect } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import { setUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // relogin
  useEffect(() => {
    const userJSON = localStorage.getItem('logginBlogApp');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      dispatch(setUser(user));
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
  } else {
    return (
      <>
        <Notification />
        <Blogs />
      </>
    );
  }
};

export default App;
