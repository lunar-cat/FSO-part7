import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAuthUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';

const Nav = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.authenticated);
  const handleLogout = () => {
    localStorage.removeItem('logginBlogApp');
    dispatch(setAuthUser(null));
    dispatch(setNotification({ content: 'Logged out', type: 'success' }));
  };
  return (
    <nav>
      <Link to={'blogs'}>Blogs</Link>
      <Link to={'users'}>Users</Link>

      <p>{user.name || user.username} logged in</p>
      <button type="button" onClick={handleLogout}>
        logout
      </button>
    </nav>
  );
};
export default Nav;
