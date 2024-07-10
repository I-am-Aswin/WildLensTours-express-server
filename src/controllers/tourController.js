import Tour from '../models/Tour.js';

// Create a new tour
export const createTour = async (req, res) => {
    let { name, description, location, price, offer, category, schedule, availableSlots } = req.body;
    let imageUrl = '';

    // console.log(schedule);
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
            offer,
            category,
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
    const { name, description, location, price, offer, category, schedule, availableSlots } = req.body;
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
        tour.offer = offer || tour.offer;
        tour.category = category || tour.category;
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
    try {
        const { location, minPrice, maxPrice, startDate, endDate } = req.query;

        // Create a query object
        let query = {};

        // Add location filter if provided
        if (location) {
            query.$or = [
                { location: { $regex: location, $options: 'i' } }, // Case-insensitive match
                { name: { $regex: location, $options: 'i' } },
                { description: { $regex: location, $options: 'i' } }
            ];
        }

        // Add price filter if provided
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Add schedule filter if provided
        if (startDate || endDate) {
            if (startDate) {
                if (!query['schedule.start']) query['schedule.start'] = {};
                query['schedule.start'].$gte = new Date(startDate);
            }
            if (endDate) {
                if (!query['schedule.end']) query['schedule.end'] = {};
                query['schedule.end'].$lte = new Date(endDate);
            }
        }

        // Find tours based on query
        const tours = await Tour.find(query).populate('reviews');

        // Send response
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
