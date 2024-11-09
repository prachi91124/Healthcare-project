const express=require("express");
const router=express.Router();
const { jwtAuthMiddleware } = require("../middleware/jwtAuthMiddleware");

const{
    registerUser,
    loginUser,
}=require("../controllers/userController");

router.post("/register", registerUser);

router.post("/login",jwtAuthMiddleware,loginUser);

module.exports=router;