import { createSlice } from '@reduxjs/toolkit';

const initialState = { authenticated: null, all: [] };
export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthUser(state, action) {
      state.authenticated = action.payload;
    },
    setUsers(state, action) {
      state.all = action.payload;
    }
  }
});

export const { setAuthUser, setUsers } = userReducer.actions;
export default userReducer.reducer;
