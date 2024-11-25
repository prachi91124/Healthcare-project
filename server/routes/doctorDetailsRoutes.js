const express = require("express");
const router = express.Router();
const {validateJwtToken} = require("../middleware/jwtAuthMiddleware");
const {
    doctorDetails,
    registerDoctor,
} = require("../controllers/doctorDetailsController");

// Route to register a new doctor
router.post("/create", validateJwtToken, registerDoctor);

// Register for doctor login
router.post("/", doctorDetails);

module.exports = router;