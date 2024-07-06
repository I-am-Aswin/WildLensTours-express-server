import express from 'express';
import { createTour, updateTour, deleteTour, getTours, getTourDetails, searchTours } from '../controllers/tourController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.get('/search', searchTours);
router.post('/', upload, createTour);
router.put('/:id', upload, updateTour);
router.delete('/:id', deleteTour);
router.get('/', getTours);
router.get('/:id', getTourDetails);

export default router;
