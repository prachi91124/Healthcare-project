const Doctor = require("../models/doctorDetailsModel");

// Controller to handle the creation of doctor details
const doctorDetails = async (req, res) => {
    try {
        const {
            name,
            specialization,
            experience,
            contactNumber,
            email,
            clinicAddress,
        } = req.body;

        // Validate required fields
        if (
            !name ||
            !specialization ||
            !experience ||
            !contactNumber ||
            !email ||
            !clinicAddress
        ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new doctor record
        const doctor = new Doctor({
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
};
const registerDoctor = async(req,res) => {
    return doctorDetails(req,res);
}
module.exports = {
    doctorDetails,
    registerDoctor
};
