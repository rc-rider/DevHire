import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  token: { type: String, default: "" },
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
export default Admin;
