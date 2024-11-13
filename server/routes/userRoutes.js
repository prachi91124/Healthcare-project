const express=require("express");
const router=express.Router();
const { jwtAuthMiddleware } = require("../middleware/jwtAuthMiddleware");

const{
    registerUser,
    loginUser,
}=require("../controllers/userController");

router.post("/register", registerUser);

//route for get the user specific data
router.get("/myaccount", jwtAuthMiddleware,getUserProfile);

//route fir updating the user specific data
router.patch("/myaccount",jwtAuthMiddleware,updateUserProfile);

//route for user login
router.post("/login",jwtAuthMiddleware,loginUser);

module.exports=router;