const baseUrl = '/api/login';

const login = async (username, password) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (response.ok) {
    return response.json();
  } else {
    const { error } = await response.json();
    if (error) throw new Error(error);
    else throw new Error(response.statusText);
  }
};

const loginService = { login };
export default loginService;
