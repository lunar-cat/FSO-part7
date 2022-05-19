const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
    .populate('blogs', { user: 0 });
  res.json(users);
});

const hasValidityErrors = (username, password) => {
  let validationError = null;
  if (!username || !password) {
    validationError = 'misssing username or password';
  } else if (username && username.length < 3) {
    validationError = 'username must be at least 3 characters long';
  } else if (password && password.length < 3) {
    validationError = 'password must be at least 3 characters long';
  }
  return validationError;
};

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body;

  const validationError = hasValidityErrors(username, password);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }
  // ojo con que sea findOne, porque find returns empty array
  // cuando no encuentra, que es un truthy value
  // y findOne null
  const foundUser = await User.findOne({ username });
  if (foundUser) {
    return res.status(400).json({ error: 'username must be unique' });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, name: name || '', passwordHash });
  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

module.exports = usersRouter;