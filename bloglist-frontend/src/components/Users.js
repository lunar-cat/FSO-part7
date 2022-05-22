import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import userService from '../services/users';
import { setUsers } from '../reducers/userReducer';
import './Users.css';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.all);
  // fetch users
  useEffect(() => {
    userService.getAll().then((users) => dispatch(setUsers(users)));
  }, [dispatch]);
  return (
    <div className="users">
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th colSpan={1}></th>
            <th colSpan={2}>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <Link to={user.id}>{user.name}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default Users;
