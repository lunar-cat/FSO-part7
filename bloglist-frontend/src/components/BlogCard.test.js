import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  const blog = {
    title: 'titulo 1',
    author: 'autor 1',
    url: 'url 1',
    likes: 32,
    user: {
      username: 'pepito',
      name: 'pepe'
    }
  };
  const mockEdit = jest.fn();
  const mockRemove = jest.fn();
  const setup = (username) =>
    render(
      <Blog
        blog={blog}
        username={username}
        handleEditBlog={mockEdit}
        handleRemoveBlog={mockRemove}
      />
    );

  test('renders title and author by default, but not url or likes', () => {
    setup('pepito');
    // expected to be defined
    const title = screen.getByText(blog.title);
    const author = screen.getByText(blog.author);
    // expected to be null
    const url = screen.queryByText(blog.url);
    const likes = screen.queryByText(blog.likes);

    expect(title).toBeDefined();
    expect(author).toBeDefined();
    expect(url).toBeNull();
    expect(likes).toBeNull();
  });
  test('url and likes are shown when button is clicked', async () => {
    setup('pepito');
    // extend button
    const showButton = screen.getByText('view');
    await userEvent.click(showButton);
    // block extended
    const url = screen.getByText(blog.url);
    const likes = screen.getByText(`likes: ${blog.likes}`);

    expect(url).toBeDefined();
    expect(likes).toBeDefined();
  });
  test('2 like button calls the event handler twice', async () => {
    setup('pepito');
    // first show expanded state
    const showButton = screen.getByText('view');
    await userEvent.click(showButton);
    // then it can click the likeButton
    const likeButton = screen.queryByText('like');
    await userEvent.click(likeButton);
    await userEvent.click(likeButton);
    // expect mock fn to be called twice
    expect(mockEdit.mock.calls).toHaveLength(2);
  });
  test('like button get called with proper arguments', async () => {
    setup('pepito');
    // first show expanded state
    const showButton = screen.getByText('view');
    await userEvent.click(showButton);
    // then it can click the likeButton
    const likeButton = screen.queryByText('like');
    await userEvent.click(likeButton);

    expect(mockEdit.mock.calls[0][0]).toEqual({
      likes: blog.likes + 1
    });
    expect(mockEdit.mock.calls[0][1]).toEqual({
      ...blog,
      likes: blog.likes + 1
    });
  });
});
