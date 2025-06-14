import express from 'express';
import { addDeveloper, adminDashboard, allDevelopers, appointmentCancel, appointmentsAdmin, loginAdmin } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailablity } from '../controllers/devControllers.js';

const adminRouter = express.Router();

adminRouter.post('/add-developers', authAdmin, upload.single('image'), addDeveloper);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-developers', authAdmin, allDevelopers);
adminRouter.post('/change-availablity', authAdmin, changeAvailablity);
adminRouter.get('/all-appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)

// ✅ New route to verify token
adminRouter.post('/verify-token', authAdmin, (req, res) => {
  return res.status(200).json({ success: true, message: "Token valid" });
});

export default adminRouter;
