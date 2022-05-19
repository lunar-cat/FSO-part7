import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('< BlogForm/>', () => {
  const mockCreate = jest.fn();
  const mockClose = jest.fn();
  const setup = () =>
    render(<BlogForm handleCreateBlog={mockCreate} closeForm={mockClose} />);
  test('createBlog fn get called with proper args', async () => {
    setup();
    const mockValues = {
      title: 'titulo test',
      author: 'autor test',
      url: 'url test'
    };
    // input title
    const title = screen.getByLabelText('Title');
    await userEvent.type(title, mockValues.title);
    // input author
    const author = screen.getByLabelText('Author');
    await userEvent.type(author, mockValues.author);
    // input url
    const url = screen.getByLabelText('URL');
    await userEvent.type(url, mockValues.url);

    // submit
    const submitButton = screen.getByText('Create');
    await userEvent.click(submitButton);

    expect(mockCreate.mock.calls[0][0]).toEqual(mockValues);
  });
});
