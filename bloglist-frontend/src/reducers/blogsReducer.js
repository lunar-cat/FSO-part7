import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
export const blogsReducer = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    removeBlog(state, action) {
      const { id } = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    editBlog(state, action) {
      const editedBlog = action.payload;
      return state.map((b) => (b.id !== editedBlog.id ? b : editedBlog));
    }
  }
});

export const { setBlogs, addBlog, removeBlog, editBlog } = blogsReducer.actions;
export default blogsReducer.reducer;
