const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        phoneNumber,
        password: hashedPassword,
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
        return res.status(201);
    }

    const passCheck = await bcrypt.compare(password, userExists.password);
    if (passCheck) {
        res.status(200);
    } else {
        res.status(201);
    }
});

const getUserProfile = asyncHandler(async (req, res) => {
    try {
        const email = req.body;
        const data = await User.findOne(email);
        if (!data) return res.status(401).json({ err });
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(500).json({ err,message });
    }
});

const updateUserProfile = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).json({ message: "Email is required" });
        const updatedUser = await User.findOneAndUpdate({ email }, updateData, {
            new: true,
        });
        if (!updatedUser)
            return res.status(404).json({ message: "User not found" });

        res.status(200).json({ data: updatedUser });
    } catch (err) {
        res.status(500).json({ message: "error", error: err.message });
    }
};
module.exports = {
    registerUser,
    loginUser,
    updateUserProfile,
    getUserProfile,
};
