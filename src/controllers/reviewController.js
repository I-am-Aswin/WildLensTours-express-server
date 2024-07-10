import Review from '../models/Review.js';

// Create a review
export const createReview = async (req, res) => {
    const { tourId, userId, rating, comment } = req.body;
    try {
        const review = new Review({ tourId, userId, rating, comment });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a review
export const updateReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a review
export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        await review.remove();
        res.status(200).json({ message: 'Review deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all reviews
export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('tourId userId');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get review details
export const getReviewDetails = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate('tourId userId');
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};