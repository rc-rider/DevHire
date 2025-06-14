import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    devId: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true },
    devData: { type: Object, required: true },
    amount: { type: Number, required: true },
    date: { type: Number, required: true },
    projectName: { type: String, required: true },
    cancelled: { type: Boolean, default: false },
    cancelledAt: { type: Date },
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false }
})

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema)

export default appointmentModel