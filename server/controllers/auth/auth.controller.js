const asyncHandler = require("express-async-handler");
const { User } = require("../../db/model");
const jwt = require("jsonwebtoken");
const { register, loginBody } = require("../../validators/auth.validator");
const {JWT_SECRET} = require("../../config/jwt.config");

class AuthController {
    //-------------Signup Handler -----------//
    register = asyncHandler(async (req, res) => {
        const { success } = register.safeParse(req.body);
        if (!success) {
            return res.status(411).json({ message: "Email already taken/incorrect inputs" });
        }

        const existingUser = await User.findOne({ username: req.body.username });

        if (existingUser) {
            return res.status(411).json({ msg: "User already exists" });

        }
        const newUser = new User({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });

        const hashedPassword = await newUser.createHash(req.body.password);
        newUser.password_hash = hashedPassword;
        const user = await newUser.save();
        const userId = user._id;

        const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '30d' });
        return res.status(201).json({ message: "User created successfully", token: token });
    });


    //---------------SignIn Handler---------------//
    login = asyncHandler(async(req, res) => {
        const {success} = loginBody.safeParse(req.body);
        if(!success){
            return res.status(411).json({message: "Invalid input"});
        }

        const existingUser = await User.findOne({username: req.body.username});
        if(!existingUser){
            return res.status(411).json({message: "User doesn't exist"});
        }
        else{
            const validPassword = await existingUser.validatePassword(req.body.password);
            if (!validPassword) {
                return res.status(401).json({ message: "Incorrect password" });
            }

            const token = jwt.sign({ id: existingUser._id }, JWT_SECRET, { expiresIn: '30d' });
            return res.status(200).json({token: token});
        }
    });
}

const authController = new AuthController();
module.exports = {authController};