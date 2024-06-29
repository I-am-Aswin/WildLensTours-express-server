import express from 'express';
import { createReview, updateReview, deleteReview, getReviews, getReviewDetails } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);
router.get('/', getReviews);
router.get('/:id', getReviewDetails);

export default router;
