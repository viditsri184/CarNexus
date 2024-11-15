const express = require("express");
const router = express.Router();
const authRouter = require("./auth.route");
const carRouter = require("./car.route");

router.use('/auth', authRouter);
router.use('/cars', carRouter);
module.exports = router;