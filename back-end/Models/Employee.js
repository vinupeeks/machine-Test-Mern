import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'UserTest' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
});

export default mongoose.model('Employee', employeeSchema);
