import express from 'express';
import { createBooking, updateBooking, cancelBooking, getBookings, getBookingDetails } from '../controllers/bookingController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', createBooking);
router.put('/:id', updateBooking);
router.delete('/:id', cancelBooking);
router.get('/', getBookings);
router.get('/:id', getBookingDetails);

export default router;
