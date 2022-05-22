import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setAuthUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';
import './Nav.css';

const Nav = () => {
  const dispatch = useDispatch();
  const loc = useLocation();
  const user = useSelector((state) => state.user.authenticated);
  const handleLogout = () => {
    localStorage.removeItem('logginBlogApp');
    dispatch(setAuthUser(null));
    dispatch(setNotification({ content: 'Logged out', type: 'success' }));
  };
  return (
    <nav>
      <Link
        to={'blogs'}
        className={
          loc.pathname.startsWith('/blogs') || loc.pathname === '/'
            ? 'active'
            : null
        }
      >
        Blogs
      </Link>
      <Link
        to={'users'}
        className={loc.pathname.startsWith('/users') ? 'active' : null}
      >
        Users
      </Link>

      <p style={{ fontStyle: 'italic' }}>
        {user.name || user.username} logged in
      </p>
      <button type="button" onClick={handleLogout} className="warning">
        logout
      </button>
    </nav>
  );
};
export default Nav;
