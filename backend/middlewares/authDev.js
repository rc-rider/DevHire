import Dev from '../models/devModels.js';
import jwt from 'jsonwebtoken';

const authDev = async (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;

    if (!bearerHeader || !bearerHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: "Dev token missing or malformed. Please login as developer.",
      });
    }

    const token = bearerHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const devUser = await Dev.findById(decoded.id);

    if (!devUser) {
      return res.status(401).json({
        success: false,
        message: "Dev user not found. Please login again.",
      });
    }

    req.dev = devUser; // Attach user to request
    next();

  } catch (error) {
    console.log("Dev Auth Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired dev token.",
    });
  }
};

export default authDev;
