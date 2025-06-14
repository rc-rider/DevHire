import User from '../models/usersModels.js';
import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
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

    const userData = await User.findById(decoded.id);

    // **Debug logs**
    console.log("Token from header:", token);
    console.log("Token in DB:", userData ? userData.token : "User not found");

    if (!userData) {
      return res.status(401).json({
        success: false,
        message: "User not found. Please login again.",
      });
    }


    req.user = userData;
    next();

  } catch (error) {
    console.log("Auth Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};


export default authUser;
