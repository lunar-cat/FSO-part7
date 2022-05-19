import PropTypes from 'prop-types';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  const type = message.type === 'error' ? 'note error' : 'note success';
  return <div className={type}>{message.content}</div>;
};

Notification.propTypes = {
  message: PropTypes.exact({
    type: PropTypes.oneOf(['error', 'success']).isRequired,
    content: PropTypes.string.isRequired
  })
};
export default Notification;
