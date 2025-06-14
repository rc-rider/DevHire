import Admin from '../models/adminModel.js';
import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;

    if (!bearerHeader || !bearerHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: "Token missing or malformed. Please login.",
      });
    }

    const token = bearerHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const adminData = await Admin.findOne({ email: decoded.email });

    if (!adminData || adminData.token !== token) {
      return res.status(401).json({
        success: false,
        message: "Token invalid or expired. Please login again.",
      });
    }

    req.admin = decoded; // Optional: attach decoded payload
    next();

  } catch (error) {
    console.log("Auth Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default authAdmin;
