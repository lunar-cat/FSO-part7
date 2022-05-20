import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const togglableReducer = createSlice({
  name: 'togglable',
  initialState,
  reducers: {
    openTogglable() {
      return true;
    },
    closeTogglable() {
      return false;
    }
  }
});

export const { openTogglable, closeTogglable } = togglableReducer.actions;
export default togglableReducer.reducer;
