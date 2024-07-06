import mongoose from "mongoose";

const TourSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    offer: { type: Number, default: 0},
    category: { type: String, required: true },
    schedule: {
        start: { type: Date, required: true },
        end: { type: Date, required: true }
    },
    availableSlots: { type: Number, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    image: { type: String }
});

const Tour = mongoose.model('Tour', TourSchema);
export default Tour;
