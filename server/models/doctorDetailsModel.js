const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    clinicAddress: {
        type: String,
        required: true,
    },
    // Add any other fields as needed
});

module.exports = mongoose.model("Doctor", doctorSchema);
