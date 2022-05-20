const baseUrl = '/api/users';

const getAll = async () => {
  const response = await fetch(baseUrl);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(response.statusText);
  }
};

const userService = { getAll };
export default userService;
