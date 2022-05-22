import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';
import './Users.css';

const User = () => {
  const match = useMatch('/users/:id');
  const users = useSelector((state) => state.user.all);
  const user = users.find((user) => user.id === match.params.id);
  if (!user) return null;
  const upperCaseName = user && user.name[0].toUpperCase() + user.name.slice(1);
  return (
    <div className="user">
      <h2>{upperCaseName}</h2>
      <h3>Added blogs:</h3>
      <ul style={{ padding: 0 }}>
        {user.blogs &&
          user.blogs.map((blog) => {
            return (
              <li key={blog.id} className={'blog-list-item'}>
                {blog.title}
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default User;
