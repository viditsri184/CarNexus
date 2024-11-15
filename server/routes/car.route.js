const express = require("express");
const upload = require("../middleware/upload.middleware");
const { carController } = require("../controllers/car/car.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();


/**
 * @swagger
 * /api/cars/create:
 *   post:
 *     summary: Create a new car listing
 *     description: Allows users to create a car listing with images, title, description, and tags.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               car_type:
 *                 type: string
 *               company:
 *                 type: string
 *               dealer:
 *                 type: string
 *             required:
 *               - title
 *               - description
 *               - images
 *               - car_type
 *               - company
 *               - dealer
 *     responses:
 *       201:
 *         description: Car successfully created
 *       400:
 *         description: Bad request. Validation errors or missing fields.
 */
router.post('/create', authMiddleware, upload.array('images', 10), carController.createCar);

/**
 * @swagger
 * /api/cars/show:
 *   get:
 *     summary: List all cars created by the user
 *     description: Fetches a list of all cars that the logged-in user has created.
 *     responses:
 *       200:
 *         description: A list of cars created by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                   car_type:
 *                     type: string
 *                   company:
 *                     type: string
 *                   dealer:
 *                     type: string
 *       401:
 *         description: Unauthorized. The user must be authenticated.
 *       500:
 *         description: Internal server error
 */
router.get('/show', authMiddleware, carController.getUserCars);

/**
 * @swagger
 * /api/cars/car/{carId}:
 *   get:
 *     summary: View details of a particular car
 *     description: Fetches the details of a car based on the car's ID.
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: The ID of the product to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                 car_type:
 *                   type: string
 *                 company:
 *                   type: string
 *                 dealer:
 *                   type: string
 *       404:
 *         description: Product not found
 */
router.get('/car', authMiddleware, carController.getCarById);

/**
 * @swagger
 * /api/cars/update/{carId}:
 *   put:
 *     summary: Update car details
 *     description: Allows users to update the title, description, tags, or images of a car.
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: The ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - title
 *               - description
 *               - images
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request. Validation errors or missing fields.
 *       404:
 *         description: Product not found
 */
router.put('/update', authMiddleware, upload.array('images', 10), carController.updateCar);


router.get("/search", authMiddleware, carController.searchCars);

/**
 * @swagger
 * /api/cars/remove/{carId}:
 *   delete:
 *     summary: Delete a car listing
 *     description: Allows users to delete a car listing by its ID.
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: The ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete('/remove', authMiddleware, carController.deleteCar);

module.exports = router;