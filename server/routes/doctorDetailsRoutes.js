const express = require("express");
const router = express.Router();

const {
    doctorDetails,
    registerDoctor,
} = require("../controllers/doctorDetailsController");

const { jwtAuthMiddleware } = require("../middleware/jwtAuthMiddleware");

// Route to register a new doctor
router.post("/create", jwtAuthMiddleware, registerDoctor);

// Register for doctor login
router.post("/", doctorDetails);

module.exports = router;