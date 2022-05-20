import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import blogsReducer from './reducers/blogsReducer';
import notificationReducer from './reducers/notificationReducer';
import togglableReducer from './reducers/togglableReducer';

export default configureStore({
  reducer: {
    user: userReducer,
    blogs: blogsReducer,
    notification: notificationReducer,
    togglable: togglableReducer
  }
});
