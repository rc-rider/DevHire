import devModels from "../models/devModels.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";
import { v2 as cloudinary } from 'cloudinary'

const changeAvailablity = async (req, res) => {
    try {

        const { devId } = req.body

        const devData = await devModels.findById(devId)
        await devModels.findByIdAndUpdate(devId, { available: !devData.available })
        res.json({
            status: 200,
            success: true,
            message: 'Availablity Changed',
            body: {}
        })


    } catch (error) {
        console.log(error);
        res.json({
            status: 500,
            success: false,
            message: error.message,
            body: {}
        });
    }

}

const developersList = async (req, res) => {
    try {
        const developers = await devModels.find({}).select(['-password', '-email'])
        res.json({
            status: 200,
            success: true,
            message: 'All Developers Data',
            body: developers
        })

    } catch (error) {
        console.log(error);
        res.json({
            status: 500,
            success: false,
            message: error.message,
            body: {}
        });
    }
}


//API for developer Login

const loginDeveloper = async (req, res) => {
    try {

        const { email, password } = req.body
        const developer = await devModels.findOne({ email })

        if (!developer) {
            return res.json({
                status: 400,
                success: false,
                message: 'Invalid Credentials',
                body: {}
            })
        }

        const isMatch = await bcrypt.compare(password, developer.password)

        if (isMatch) {

            const token = jwt.sign({ id: developer._id }, process.env.JWT_SECRET)

            res.json({
                status: 200,
                success: true,
                message: 'Token Match',
                body: token
            })
        } else {
            return res.json({
                status: 400,
                success: false,
                message: 'Invalid Credentials',
                body: {}
            })
        }

    } catch (error) {
        console.log(error);
        res.json({
            status: 500,
            success: false,
            message: error.message,
            body: {}
        });
    }
}

// API to get clients appointments to dev panel

const appointmentsDev = async (req, res) => {
    try {

        const devId = req.dev._id;
        const appointments = await appointmentModel.find({ devId })

        res.json({
            status: 200,
            success: true,
            message: "Find All Appointments",
            body: appointments
        })

    } catch (error) {
        console.log(error);
        res.json({
            status: 500,
            success: false,
            message: error.message,
            body: {}
        });
    }
}

// API to mark appointment completed for developer panel

const appointmentComplete = async (req, res) => {
    try {

        const devId = req.dev._id;
        const { appointmentId } = req.body;


        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.devId.toString() === devId.toString()) {

            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })

            return res.json({
                status: 200,
                success: true,
                message: 'Appointment Completed',
                body: {}
            })
        } else {
            return res.json({
                status: 400,
                success: false,
                message: 'Marked Failed',
                body: {}
            })
        }


    } catch (error) {
        console.log(error);
        res.json({
            status: 500,
            success: false,
            message: error.message,
            body: {}
        });
    }
}
// API to cancel appointment for developer panel

const appointmentCancel = async (req, res) => {
    try {

        const devId = req.dev._id;
        const { appointmentId } = req.body;


        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.devId.toString() === devId.toString()) {

            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

            return res.json({
                status: 200,
                success: true,
                message: 'Appointment Cancelled',
                body: {}
            })
        } else {
            return res.json({
                status: 400,
                success: false,
                message: 'Cancellation Failed',
                body: {}
            })
        }


    } catch (error) {
        console.log(error);
        res.json({
            status: 500,
            success: false,
            message: error.message,
            body: {}
        });
    }
}

// Api to get Dashboard data for Developer panel

const devDashboard = async (req, res) => {
    try {

        const devId = req.dev._id;

        const appointments = await appointmentModel.find({ devId })

        let earnings = 0

        appointments.map((items) => {
            if (items.isCompleted || items.payment) {
                earnings += items.amount
            }
        })

        let clients = []

        appointments.map((items) => {
            if (!clients.includes(items.userId)) {
                clients.push(items.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            clients: clients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({
            status: 200,
            success: true,
            message: 'Dashboard Data',
            body: dashData
        })

    } catch (error) {
        console.log(error);
        res.json({
            status: 500,
            success: false,
            message: error.message,
            body: {}
        });
    }
}

// API to get Developer profile for dev panel

const devProfile = async (req, res) => {
    try {

        const devId = req.dev._id;
        const profileData = await devModels.findById(devId).select('-password')

        res.json({
            status: 200,
            success: true,
            message: 'Data Fatech Successfully',
            body: profileData
        })

    } catch (error) {
        console.log(error);
        res.json({
            status: 500,
            success: false,
            message: error.message,
            body: {}
        });
    }
}


// API to update developer profile data from dev panel

const updateDevProfile = async (req, res) => {
    try {
        const devId = req.dev._id;
        const {
            hourlyRate,
            available,
            skills,
            about,
            experience,
            name,
            degree,
            speciality,
            'address[line1]': addressLine1,
            'address[line2]': addressLine2,
        } = req.body;

        const address = {
            line1: addressLine1,
            line2: addressLine2,
        };


        await devModels.findByIdAndUpdate(devId, {
            hourlyRate,
            address,
            available,
            skills,
            about,
            experience,
            name,
            degree,
            speciality
        });


        // If image is present, upload to Cloudinary and update
        const imageFile = req.file; // ✅ Correct now
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: 'image',
            });
            const imageUrl = imageUpload.secure_url;
            await devModels.findByIdAndUpdate(devId, { image: imageUrl });
        }


        // Optional: Fetch updated user
        const updatedDev = await devModels.findById(devId).select('-password');

        return res.json({
            status: 200,
            success: true,
            message: 'Profile Updated',
            body: updatedDev
        })

    } catch (error) {
        console.log(error);
        res.json({
            status: 500,
            success: false,
            message: error.message,
            body: {}
        });
    }
}

export { changeAvailablity, developersList, loginDeveloper, appointmentsDev, appointmentComplete, appointmentCancel, devDashboard, devProfile, updateDevProfile }