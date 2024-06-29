import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    date: { type: Date, required: true }
});

const Review = mongoose.model('Review', ReviewSchema);

export default Review;
