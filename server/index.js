const express = require("express");
const router = require("./routes/index");
const app = express();
const cors = require("cors");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Define Swagger options
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CarNexus API',
            version: '1.0.0',
            description: 'API documentation for CarNexus application',
        },
    },
    apis: ['./routes/*.js'], // Path to the API route files
};

// Initialize Swagger documentation
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use('/api', router);

const port = process.env.PORT || 8080;
const start = () => {
    try {
        app.listen(port, () => {
            console.log(`http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}
start();
