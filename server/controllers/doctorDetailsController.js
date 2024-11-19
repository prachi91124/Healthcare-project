const Doctor = require("../models/doctorDetailsModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
require("dotenv").config();
// Controller to handle the creation of doctor details
const doctorDetails = asyncHandler(async (req, res) => {
    try {
        const {name, specialization, experience, contactNumber, email, clinicAddress} = req.body;

        // Validate required fields
        if (!name || !specialization || !experience || !contactNumber || !email || !clinicAddress) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await doctor.findOne({name});
        if(userExists){
            return res.status(400).json({message:"user already exists"});
        }
        // Create a new doctor record
        const doctor = await Doctor.create({
            name,
            specialization,
            experience,
            contactNumber,
            email,
            clinicAddress,
        });

        // Save the doctor record to the database
        await doctor.save();

        res.status(201).json({
            message: "Doctor details added successfully",
            doctor,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
const registerDoctor = async(req,res) => {
    return doctorDetails(req,res);
}
module.exports = {
    doctorDetails,
    registerDoctor
};
