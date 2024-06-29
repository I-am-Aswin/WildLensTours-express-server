import Tour from '../models/Tour.js';

// Create a new tour
export const createTour = async (req, res) => {
    let { name, description, location, price, schedule, availableSlots } = req.body;
    let imageUrl = '';

    schedule = JSON.parse(schedule);

    if (req.file) {
        imageUrl = `/uploads/images/${req.file.filename}`;
    }

    try {
        const tour = new Tour({
            name,
            description,
            location,
            price,
            schedule,
            availableSlots,
            image: imageUrl
        });

        await tour.save();
        res.status(201).json(tour);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a tour
export const updateTour = async (req, res) => {
    const { name, description, location, price, schedule, availableSlots } = req.body;
    let imageUrl = '';

    if (req.file) {
        imageUrl = `/uploads/images/${req.file.filename}`;
    }

    try {
        const tour = await Tour.findById(req.params.id);

        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        tour.name = name || tour.name;
        tour.description = description || tour.description;
        tour.location = location || tour.location;
        tour.price = price || tour.price;
        tour.schedule = schedule || tour.schedule;
        tour.availableSlots = availableSlots || tour.availableSlots;
        tour.image = imageUrl || tour.image;

        await tour.save();
        res.status(200).json(tour);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a tour
export const deleteTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);

        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        await tour.remove();
        res.status(200).json({ message: 'Tour deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all tours
export const getTours = async (req, res) => {
    try {
        const tours = await Tour.find();
        res.status(200).json(tours);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get tour details
export const getTourDetails = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id).populate('reviews');
        res.status(200).json(tour);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Search tours
export const searchTours = async (req, res) => {
    // Implementation for searching tours
};
