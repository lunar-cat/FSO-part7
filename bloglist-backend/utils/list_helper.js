const dummy = () => 1;

const totalLikes = (blogs) => {
  return blogs.reduce((p, c) => p + c.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return undefined;
  if (blogs.length === 1) return blogs[0];
  let favBlog;
  let favLikes = 0;
  blogs.forEach((blog) => {
    if (blog.likes > favLikes) {
      favBlog = blog;
      favLikes = blog.likes;
    }
  });
  return favBlog;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }
  if (blogs.length === 1) {
    return { author: blogs[0].author, blogs: 1 };
  }
  const authors = {};
  let maxAuthor;
  let maxBlogs = 1;
  blogs.forEach((blog) => {
    const initAmount = authors[blog.author] || 0;
    const newAmount = initAmount + 1;
    authors[blog.author] = newAmount;
    if (newAmount > maxBlogs) {
      maxAuthor = blog.author;
      maxBlogs = newAmount;
    }
  });
  return { author: maxAuthor, blogs: maxBlogs };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }
  if (blogs.length === 1) {
    return { author: blogs[0].author, likes: blogs[0].likes };
  }
  const authors = {};
  let maxAuthor;
  let maxLikes = 0;
  blogs.forEach((blog) => {
    const initAmount = authors[blog.author] || 0;
    const newAmount = initAmount + blog.likes;
    authors[blog.author] = newAmount;
    if (newAmount > maxLikes) {
      maxAuthor = blog.author;
      maxLikes = newAmount;
    }
  });
  return { author: maxAuthor, likes: maxLikes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
