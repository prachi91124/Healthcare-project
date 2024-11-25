const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { generateJwtToken } = require("../middleware/jwtAuthMiddleware");
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;

    if (!name || !email || !password || !phoneNumber) {
        res.status(400);
        throw new Error("Please provide all fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }
    
    const user = await User.create({
        name,
        email,
        phoneNumber,
        password: await bcrypt.hash(password, 12),
    });

    res.status(201).json({ message: "user registered successfully", user });
});
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide all fields");
    }

    const userExists = await User.findOne({ email });
    if (!userExists) {
        return res.status(401).json({message:"Invalid credentials"});
    }

    const passCheck = await bcrypt.compare(password, userExists.password);
    if (!passCheck) {
        res.status(401).json({message:"Invalid credentials"});
    }
    const token = generateJwtToken({id: userExists._id, email: userExists.email});

    res.status(200).json({message:"Login successful",token});
});

const getUserProfile = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message:"User not found" });
        return res.status(200).json({ user});
    } catch (err) {
        return res.status(500).json({ errpr: err.message,message:"Server Error" });
    }
});

const updateUserProfile = async (req, res) => {
    try {
        const { email,updateData } = req.body;
        if (!email || !updateData){
            return res.status(400).json({ message: "Email and update data is required" });
        }
        const updatedUser = await User.findOneAndUpdate({ email }, updateData, {
            new: true,
        });
        if (!updatedUser){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ data: updatedUser });
    } catch (err) {
        res.status(500).json({ message: "Error updating USer", error: err.message });
    }
};
module.exports = {
    registerUser,
    loginUser,
    updateUserProfile,
    getUserProfile,
};
