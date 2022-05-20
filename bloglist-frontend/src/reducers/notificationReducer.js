import { createSlice } from '@reduxjs/toolkit';

const initialState = null; // {content: string, type: string}
export const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload;
    },
    remove(state, action) {
      return initialState;
    }
  }
});

const { set, remove } = notificationReducer.actions;
export const setNotification = ({ content, type }) => {
  return (dispatch) => {
    dispatch(set({ content, type }));
    setTimeout(() => dispatch(remove()), 5000);
  };
};
export default notificationReducer.reducer;
