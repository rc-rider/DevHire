import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import devModels from '../models/devModels.js'
import jwt from 'jsonwebtoken'
import Admin from '../models/adminModel.js'
import appointmentModel from '../models/appointmentModel.js'
import usersModels from '../models/usersModels.js'

// API for adding developers
const addDeveloper = async (req, res) => {

  try {

    const { name, email, password, speciality, degree, skills, experience, about, hourlyRate, address } = req.body
    const imageFile = req.file

    //Checking for all data to add developer 
    if (!name || !email || !password || !speciality || !degree || !skills || !experience || !about || !hourlyRate || !address) {
      return res.json({
        status: 400,
        success: false,
        message: "Missing Details",
        body: {}
      })
    }

    //validating email format 
    if (!validator.isEmail(email)) {
      return res.json({
        status: 400,
        success: false,
        message: " Please enter a valid email",
        body: {}
      })

    }

    // validating Strong password 
    if (password.length < 8) {
      return res.json({
        status: 400,
        success: false,
        message: "Please enter a strong password",
        body: {}
      })
    }

    // hashing developers password

    const salt = await bcrypt.genSalt(11)
    const hashedPassword = await bcrypt.hash(password, salt)

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
    const imageUrl = imageUpload.secure_url

    const devData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      skills,
      experience,
      about,
      hourlyRate,
      address: JSON.parse(address),
      date: Date.now(),
      addedByAdmin: true
    }

    const newDev = new devModels(devData)
    await newDev.save()

    res.json({
      status: 200,
      success: true,
      message: "Developer Added Successfully 🤩",
      body: {}
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

// API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const payload = { email, role: "admin", loginAt: new Date().toISOString() };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

      // Save or update token in DB for this admin
      await Admin.findOneAndUpdate(
        { email: email },
        { token: token },
        { upsert: true, new: true }
      );

      res.json({
        status: 200,
        success: true,
        message: "Token generated",
        body: { token }
      });
    } else {
      res.json({
        status: 400,
        success: false,
        message: "Invalid credentials",
        body: {}
      });
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
};

//API to get all developer list for admin panel

const allDevelopers = async (req, res) => {
  try {

    const developers = await devModels.find({}).select('-password')
    res.json({ success: true, developers })

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


// API to get all appointments list 

const appointmentsAdmin = async (req, res) => {
  try {

    const appointments = await appointmentModel.find({})
    res.json({
      status: 200,
      success: true,
      message: 'All Appointments Data',
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

// API for Appointment cancellation 

const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        
        // Find the appointment that belongs to the user
        const appointment = await appointmentModel.findOne({ _id: appointmentId});

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

// API to get Dashboard data for admin panel 
const   adminDashboard = async (req,res) => {
  try {
    
    const developers = await devModels.find({})
    const users =await usersModels.find({})
    const appointment = await appointmentModel.find({})

    const dashData =  {
      developers: developers.length,
      appointment:appointment.length,
      clients: users.length,
      latestAppointments: appointment.reverse().slice(0,7)
    }

    res.json({
      status:200,
      success:true,
      message:'Dashboard Data',
      body:dashData
    })

  } catch (error) {
    console.log("Cancel Error:", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
            body: {}
        });
  }
}
export { addDeveloper, loginAdmin, allDevelopers, appointmentsAdmin, appointmentCancel, adminDashboard}