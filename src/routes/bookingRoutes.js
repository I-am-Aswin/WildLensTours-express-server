import express from 'express';
import { createBooking, updateBooking, cancelBooking, getBookings, getBookingDetails } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.put('/:id', updateBooking);
router.delete('/:id', cancelBooking);
router.get('/', getBookings);
router.get('/:id', getBookingDetails);

export default router;
