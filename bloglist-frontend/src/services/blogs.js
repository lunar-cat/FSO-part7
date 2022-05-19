const baseUrl = '/api/blogs';
const headers = new Headers({ 'Content-Type': 'application/json' });

const setToken = (token) => {
  headers.set('Authorization', `Bearer ${token}`); // ojo con poner set en vez de append, porque termina con duplicados bearer ... bearer ...
};

const getAll = async () => {
  const response = await fetch(baseUrl);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(response.statusText);
  }
};

const create = async (blog) => {
  if (!headers.has('Authorization')) {
    console.log('missing authorization header token');
    return;
  }
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(blog)
  });
  if (response.ok) {
    return response.json();
  } else {
    const { error } = await response.json();
    if (error) throw new Error(error);
    else throw new Error(response.statusText);
  }
};

const modify = async (blog, blogId) => {
  if (!headers.has('Authorization')) {
    console.log('missing authorization header token');
    return;
  }
  const response = await fetch(`${baseUrl}/${blogId}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(blog)
  });
  if (response.ok) {
    return response.json();
  } else {
    const { error } = await response.json();
    if (error) throw new Error(error);
    else throw new Error(response.statusText);
  }
};

const remove = async (blogId) => {
  if (!headers.has('Authorization')) {
    console.log('missing authorization header token');
    return;
  }
  const response = await fetch(`${baseUrl}/${blogId}`, {
    method: 'DELETE',
    headers: headers
  });
  if (!response.ok) {
    const { error } = await response.json();
    if (error) throw new Error(error);
    else throw new Error(response.statusText);
  }
};

const blogService = { create, getAll, setToken, modify, remove };
export default blogService;
