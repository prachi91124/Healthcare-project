const express = require ("express");
const router = express.Router();

const{
    doctorDetails
}= require("../controllers/doctorDetailsController");

router.post("/details",doctorDetails);

module.exports = router;