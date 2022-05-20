import { useSelector } from 'react-redux';

const Notification = () => {
  const message = useSelector((state) => state.notification);
  if (message === null) {
    return null;
  }
  const type = message.type === 'error' ? 'note error' : 'note success';
  return <div className={type}>{message.content}</div>;
};

export default Notification;
