import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';

const User = () => {
  const match = useMatch('/users/:id');
  const users = useSelector((state) => state.user.all);
  const user = users.find((user) => user.id === match.params.id);
  if (!user) return null;
  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs &&
          user.blogs.map((blog) => {
            return <li key={blog.id}>{blog.title}</li>;
          })}
      </ul>
    </div>
  );
};
export default User;
