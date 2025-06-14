import validator from 'validator'
import bcrypt from 'bcrypt'
import usersModels from '../models/usersModels.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import devModels from '../models/devModels.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'

// API to register user

const registerUser = async (req, res) => {
    try {
        console.log("Request Body:", req.body);


        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({
                status: 400,
                success: 'false',
                message: 'Missing Details',
                body: {}
            })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({
                status: 400,
                success: 'false',
                message: 'Enter a  valid email',
                body: {}
            })

        }

        // validating a strong password
        if (password.length < 8) {
            return res.json({
                status: 400,
                success: 'false',
                message: 'Enter a strong Password',
                body: {}
            })

        }

        // hashing user password 

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,

        }
        const newUser = new usersModels(userData)
        const user = await newUser.save()


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({
            status: 200,
            success: true,
            message: '',
            body: token
        })


    } catch (error) {
        console.log(error)
        res.json({
            status: 500,
            success: false,
            message: error.message,
            body: {}
        })
    }
}

// API for user login user 

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await usersModels.findOne({ email })

        if (!user) {
            return res.json({
                status: 400,
                success: false,
                message: 'User does not exist',
                body: {}
            })
        }


        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            user.token = token;         // Save token to DB here
            await user.save();
            res.json({
                status: 200,
                success: true,
                message: 'Login Successfully',
                body: token
            })
        } else {
            res.json({
                status: 400,
                success: false,
                message: 'Invalid Credentials',
                body: {}
            })
        }


    } catch (error) {
        console.log(error)
        res.json({
            status: 500,
            success: false,
            message: error.message,
            body: {}
        })
    }
}

//API get user profile data

const getProfile = async (req, res) => {
    try {
        const userData = await usersModels.findById(req.user.id).select('-password');
        res.status(200).json({
            success: true,
            message: '',
            body: userData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
            body: {},
        });
    }
};


//api to update user profile 


const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Get from auth middleware
        const { name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if (!name || !phone || !dob || !gender) {
            return res.json({
                status: 400,
                success: false,
                message: 'Data Missing',
                body: {}
            });
        }

        // Update text data
        await usersModels.findByIdAndUpdate(userId, {
            name,
            phone,
            address: JSON.parse(address),
            dob,
            gender
        });

        // If image is present, upload to Cloudinary and update
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: 'image'
            });
            const imageUrl = imageUpload.secure_url;

            await usersModels.findByIdAndUpdate(userId, { image: imageUrl });
        }

        // Optional: Fetch updated user
        const updatedUser = await usersModels.findById(userId).select('-password');

        res.json({
            status: 200,
            success: true,
            message: 'Profile Updated',
            body: updatedUser
        });

    } catch (error) {
        console.log("Update Error:", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
            body: {}
        });
    }
};

//API to book appointment

const bookappointment = async (req, res) => {
    try {

        const { userId, devId, slotDate, slotTime, projectName } = req.body

        const devData = await devModels.findById(devId).select('-password')

        if (!devData.available) {

            return res.json({
                status: 400,
                success: false,
                message: 'Developer Not Available',
            })
        }

        let slots_booked = devData.slots_booked

        //Checking for slot availabilty
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({
                    status: 400,
                    success: false,
                    message: 'Slots Not Available',
                })
            } else {
                slots_booked[slotDate].push(slotTime)
            }

        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)

        }


        const userData = await usersModels.findById(userId).select('-password')

        delete devData.slots_booked

        const appointmentData = {
            userId,
            devId,
            userData,
            devData,
            amount: devData.hourlyRate,
            slotDate,
            slotTime,
            projectName,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        //save new slots data in devData

        await devModels.findByIdAndUpdate(devId, { slots_booked })

        res.json({
            status: 200,
            success: true,
            message: 'Appointment Booked',
            body: {}
        })

    } catch (error) {
        console.log("Update Error:", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
            body: {}
        });
    }
}

// API to get user appointments for frontend my-appointment page
const listAppointment = async (req, res) => {

    try {

        const userId = req.user._id;
        const appointments = await appointmentModel.find({ userId })

        res.json({
            staus: 200,
            success: true,
            message: '',
            body: appointments
        })

    } catch (error) {
        console.log("Update Error:", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
            body: {}
        });
    }
}

//Api to cancel appointment

const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const userId = req.user._id;

        // Find the appointment that belongs to the user
        const appointment = await appointmentModel.findOne({ _id: appointmentId, userId });

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found or not authorized",
            });
        }

        // ✅ Mark the appointment as cancelled (do NOT delete)
        appointment.cancelled = true;
        appointment.cancelledAt = new Date();
        await appointment.save();


        // ✅ Release the dev slot if not already cancelled
        const { devId, slotDate, slotTime } = appointment;

        const devData = await devModels.findById(devId);
        if (devData && devData.slots_booked?.[slotDate]) {
            devData.slots_booked[slotDate] = devData.slots_booked[slotDate].filter(
                (slot) => slot !== slotTime
            );
            await devModels.findByIdAndUpdate(devId, { slots_booked: devData.slots_booked });
        }

        // Response
        res.json({
            success: true,
            message: "Appointment Cancelled",
            body: {}
        });

    } catch (error) {
        console.log("Cancel Error:", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
            body: {}
        });
    }
};

// Add a deleteAppointment API

const deleteAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;

        const appointment = await appointmentModel.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        if (!appointment.cancelled && !appointment.isCompleted) {
            return res.status(400).json({
                success: false,
                message: "Only cancelled or completed appointments can be deleted"
            });
        }


        // Delete the appointment
        await appointmentModel.findByIdAndDelete(appointmentId);

        res.json({ success: true, message: "Appointment deleted successfully" });
    } catch (error) {
        console.log("Delete Appointment Error:", error.message);
        res.status(500).json({ status: 500, success: false, message: "Server error", body: {} });
    }
};

// API for razorpay 
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})


//Api to make payments using Razorpay

const paymentRazorpay = async (req, res) => {

    try {

        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({
                status: 400,
                success: false,
                message: 'Appointment Cancelled Or Not Found',
                body: {}
            })
        }

        // Creating options for razorpay payment 

        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }

        // creation of an order
        const order = await razorpayInstance.orders.create(options)
        res.json({
            status: 200,
            success: true,
            message: "",
            body: order
        })

    } catch (error) {
        console.log("Delete Appointment Error:", error.message);
        res.status(500).json({ status: 500, success: false, message: "Server error", body: {} });
    }

}

//API to verify payment of razorpay

const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)


        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            return res.json({
                status: 200,
                success: true,
                message: 'Payment Successful',
                body: {}
            })
        } else {
            return res.json({
                status: 400,
                success: false,
                message: 'Payment Failed',
                body: {}
            })
        }

    } catch (error) {
        console.log("Delete Appointment Error:", error.message);
        res.status(500).json({ status: 500, success: false, message: "Server error", body: {} });
    }
}

export { registerUser, loginUser, getProfile, updateProfile, bookappointment, listAppointment, cancelAppointment, deleteAppointment, paymentRazorpay, verifyRazorpay }