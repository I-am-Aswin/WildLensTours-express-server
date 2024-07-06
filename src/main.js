import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";


const app = express()
const PORT = process.env.PORT || 3000;

connectDB();


app.use( cors({
    origin: "*"
}) );
app.use( express.json() );
app.use( express.urlencoded( {extended: true}) );

app.use( '/uploads', express.static('./public/uploads'));


app.use( (req, _, next) => {
    console.log("New Request Received : \t",req.url);
    next();
})

app.get( '/', async (req, res ) => { 
    res.send("Success Screen");
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen( PORT, () => console.log(`Server started listening on ${PORT}`));