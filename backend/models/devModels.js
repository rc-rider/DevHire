import mongoose from "mongoose";

const devSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  speciality: { type: String, required: true },
  degree: { type: String, required: true },
  skills: { type: String, required: true },
  experience: { type: String, required: true },
  about: { type: String, required: true },
  available: { type: Boolean, default: true },
  hourlyRate: { type: Number, required: true },
  address: { type: Object, required: true },
  date: { type: Number, required: true },
  slots_booked: { type: Object, default: {} },
  addedByAdmin: { type: Boolean, default: false } // more descriptive
}, { minimize: false, timestamps: true })


const devModels = mongoose.models.developers || new mongoose.model("developers", devSchema)


export default devModels