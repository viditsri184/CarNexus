const mongoose = require("mongoose");
const argon2 = require("argon2");

require('dotenv').config();
const dbURI = process.env.MONGODB_URL
    .replace('${MONGODB_USER}', process.env.MONGODB_USER)
    .replace('${MONGODB_PASSWORD}', process.env.MONGODB_PASSWORD);
// Connect to MongoDB
mongoose.connect(dbURI);

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    password_hash: {
        type: String,
        required: true,
        minLength: 6
    }
});

// Method to generate Hash from plain text  using argon2
userSchema.methods.createHash = async function(plainTextPassword){
    // return password hash
    return await argon2.hash(plainTextPassword);
}

// Method to validate the entered password using argon2
userSchema.methods.validatePassword = async function(candidatePassword){
    return await argon2.verify(this.password_hash, candidatePassword);
}


function arrayLimit(val){
    return val.length <= 10;
}

const carSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true }, // e.g., car_type, company, dealer
    images: { type: [String], validate: [arrayLimit, 'Maximum 10 images allowed'] },
});

const User = mongoose.model('User', userSchema);
const Car = mongoose.model('Car', carSchema);
module.exports = { User, Car };