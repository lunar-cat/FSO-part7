import { useSelector, useDispatch } from 'react-redux';
import { openTogglable, closeTogglable } from '../reducers/togglableReducer';

const Togglable = ({ children, buttonLabel }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.togglable);
  if (isOpen) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {children}
        <button
          onClick={() => dispatch(closeTogglable())}
          className={'warning'}
          style={{ marginTop: '1rem', alignSelf: 'center' }}
        >
          cancel
        </button>
      </div>
    );
  }
  return (
    <button onClick={() => dispatch(openTogglable())}>{buttonLabel}</button>
  );
};

export default Togglable;
