import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import UserTest from '../Models/UserSchema.js';

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log(decoded);
    req.userId = decoded.id;
    // console.log(req.userId);

    const user = await UserTest.findById(req.userId);
    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'Unauthorized: User not found' });
    }

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Unauthorized: Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Unauthorized: Token has expired' });
    } else {
      return res.status(500).json({ message: 'Server error' });
    }
  }
};

export default verifyToken;
