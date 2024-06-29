import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import Review from "./models/Review.js";


const app = express()
const PORT = process.env.PORT || 3000;

connectDB();

app.use( cors({
    origin: "*"
}) );
app.use( express.json() );
app.use( express.urlencoded( {extended: true}) );
app.use( (req, _, next) => {
    console.log("New Request Received : \t",req.url);
    next();
})

app.get( '/', async (req, res ) => {
    
    res.send("Success Screen");
});

app.listen( PORT, () => console.log(`Server started listening on ${PORT}`));