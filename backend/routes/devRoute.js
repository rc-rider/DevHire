import express from 'express'
import { appointmentCancel, appointmentComplete, appointmentsDev, devDashboard, developersList, devProfile, loginDeveloper, updateDevProfile } from '../controllers/devControllers.js'
import authDev from '../middlewares/authDev.js'
import upload from '../middlewares/multer.js'


const developersRouter = express.Router()
developersRouter.get('/list', developersList)
developersRouter.post('/login', loginDeveloper)
developersRouter.get('/appointments', authDev, appointmentsDev)
developersRouter.post('/complete-appointment', authDev, appointmentComplete)
developersRouter.post('/cancelled-appointment', authDev, appointmentCancel)
developersRouter.get('/dashboard', authDev, devDashboard)
developersRouter.get('/profile',authDev,devProfile)
developersRouter.post('/update-profile', authDev, upload.single('imageFile'), updateDevProfile)


export default developersRouter