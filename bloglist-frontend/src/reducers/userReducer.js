import { createSlice } from '@reduxjs/toolkit';

const initialState = null;
export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    }
  }
});

export const { setUser } = userReducer.actions;
export default userReducer.reducer;
