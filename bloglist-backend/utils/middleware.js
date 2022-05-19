const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requestLogger = (req, res, next) => {
  console.log('Method:\t', req.method);
  console.log('Path:\t', req.path);
  console.log('Body:\t', req.body);
  console.log('---');
  next();
};

const unknownEndpoint = (_, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  console.log(error.name, error.message);
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' });
  }
  next(error);
};

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization');
  let token = null;
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    token = auth.substring(7);
  }
  req.token = token;
  next();
};

const userExtractor = async (req, res, next) => {
  req.user = null;
  if (!req.token && req.method === 'GET') {
    // si viene sin token en GET no lo necesita
    return next();
  } else if (!req.token && req.method !== 'GET') {
    return res.status(401).json({ error: 'token missing or invalid' });
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken.id) {
    // en cambio si viene pero falla el verify
    return res.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  req.user = user;
  next();
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
  requestLogger
};
