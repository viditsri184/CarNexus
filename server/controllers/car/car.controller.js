const asyncHandler = require("express-async-handler");
const { createCarBody, updateCarBody } = require("../../validators/car.validator");
const { Car } = require("../../db/model");
const { cloudinary } = require("../../config/cloudinary.config");
const fs = require('fs');

class CarController {
    // Create a product (new car)
    createCar = asyncHandler(async (req, res) => {
        console.log("Request body:", req.body);

        const { title, description } = req.body;
        let tags = req.body.tags;

        if (typeof tags === 'string') {
            try {
                tags = JSON.parse(tags);
            } catch (error) {
                console.error("Invalid tags format:", error);
                return res.status(411).json({ msg: "Invalid tags format" });
            }
        }

        const userPayload = { title, description, tags };

        const validationResult = createCarBody.safeParse(userPayload);
        if (!validationResult.success) {
            console.error("Validation errors:", validationResult.error.errors);
            return res.status(401).json({ msg: "Invalid inputs", errors: validationResult.error.errors });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ msg: "At least one image is required" });
        }

        const images = [];
        for (const file of req.files) {
            try {
                const result = await cloudinary.uploader.upload(file.path);
                images.push(result.secure_url);
            } catch (error) {
                console.error("Cloudinary upload error:", error);
                return res.status(500).json({ msg: "Image upload failed" });
            }
        }

        const userId = req.userId;

        try {
            const car = new Car({
                userId,
                title,
                description,
                tags,
                images
            });

            await car.save();
            return res.status(201).json({ message: "Car created successfully", car });
        } catch (error) {
            console.error("Database save error:", error);
            return res.status(500).json({ msg: "Error saving car to the database" });
        }
    });

    // get all cars of a user
    getUserCars = asyncHandler(async (req, res) => {
        const cars = await Car.find({ userId: req.userId });

        if (!cars) {
            return res.status(401).json({ msg: "Some Error occurred" });
        }
        return res.status(200).json(cars);
    });

    // Get a car by ID
    getCarById = asyncHandler(async (req, res) => {
        const carId = req.query.carId;
        if (!carId) {
            return res.status(400).json({ msg: 'carId is required' });
        }
        // Fetch the car by ID and send the response
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ msg: 'Car not found' });
        }
        return res.status(200).json(car);
    });


    // Search cars
    searchCars = asyncHandler(async (req, res) => {
        const { query } = req.query; // Get the search query from request

        if (!query) {
            return res.status(400).json({ msg: "Search query is required" });
        }

        // Use a case-insensitive search for title, description, and tags
        const cars = await Car.find({
            userId: req.userId, // Ensure only the user's cars are returned
            $or: [
                { title: { $regex: query, $options: "i" } }, // Case-insensitive search for title
                { description: { $regex: query, $options: "i" } }, // Case-insensitive search for description
                { tags: { $in: [query] } } // Search for tags (if tags are an array)
            ]
        });

        if (!cars || cars.length === 0) {
            return res.status(404).json({ msg: "No cars found matching the search criteria" });
        }

        return res.status(200).json(cars);
    });

    // update a car
    updateCar = asyncHandler(async (req, res) => {
        const { title, description } = req.body;
        let tags = req.body.tags;

        // Parse tags if they are sent as a JSON string
        if (typeof tags === 'string') {
            try {
                tags = JSON.parse(tags);
            } catch (error) {
                return res.status(411).json({ msg: "Invalid tags format" });
            }
        }

        // Validate the inputs with the schema (if using zod or another schema validator)
        const userPayload = { title, description, tags };
        const { success } = updateCarBody.safeParse(userPayload);
        if (!success) {
            return res.status(411).json({ msg: "Invalid inputs/ inputs are missing" });
        }

        // Handle image uploads and add the URLs to an array
        const images = [];
        // if(req.files && Array.isArray(req.files)){
        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path);
            images.push(result.secure_url); // Add the Cloudinary URL to the images array
        }
        // }

        // Find and update the car record
        const car = await Car.findOneAndUpdate(
            { _id: req.query.carId, userId: req.userId },
            {
                $set: {
                    title,
                    description,
                    tags,
                },
                $push: {
                    images: { $each: images }  // Append new images to the existing array
                }
            },
        );

        if (!car) {
            return res.status(404).json({ msg: "Car not found or you don't have permission to update" });
        }

        return res.status(200).json({ msg: "Car updated successfully", car });
    });

    // delete a car
    deleteCar = asyncHandler(async (req, res) => {
        await Car.deleteOne({ _id: req.query.carId, userId: req.userId });
        return res.status(200).json({ message: 'Car deleted' });
    });
}

const carController = new CarController();
module.exports = { carController };