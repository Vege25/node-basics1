import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authenticateToken = (req, res, next) => {
  console.log('authenticateToken', req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token', token);
  if (token == null) {
    const error = new Error({ message: 'Token is null' });
    error.status = 401;
    return next(error);
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    const error = new Error({ message: 'Invalid token' });
    error.status = 403;
    return next(error);
  }
};

export { authenticateToken };
