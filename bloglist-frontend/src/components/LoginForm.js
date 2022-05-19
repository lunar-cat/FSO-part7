const LoginForm = ({
  handleLogin,
  username, password,
  handleUsername, handlePassword
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin} data-cy="login-form">
        <div>
          <label htmlFor="username">
            Username
          </label>
          <input
            type="text" id="username" name="username" data-cy="login-username"
            value={username} onChange={handleUsername}
          />
        </div>
        <div>
          <label htmlFor="password">
            Password
          </label>
          <input
            type="password" id="password" name="password" data-cy="login-password"
            value={password} onChange={handlePassword}
          />
        </div>
        <button type="submit" data-cy="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;