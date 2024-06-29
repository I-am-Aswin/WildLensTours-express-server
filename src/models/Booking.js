import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
    bookingDate: { type: Date, required: true },
    status: { type: String, required: true },
    companions: [{
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true }
    }]
});

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;
