import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    fullName: { type: String, required: true },
    previousBookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
});

const User =  mongoose.model('User', UserSchema);

export default User;
