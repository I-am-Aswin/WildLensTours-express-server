import Booking from '../models/Booking.js';

// Create a booking
export const createBooking = async (req, res) => {
    const { userId, tourId, bookingDate, status, companions } = req.body;
    try {
        const booking = new Booking({ userId, tourId, bookingDate, status, companions });
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a booking
export const updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        await booking.remove();
        res.status(200).json({ message: 'Booking cancelled' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all bookings
export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('tourId userId');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get booking details
export const getBookingDetails = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('tourId userId');
        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
