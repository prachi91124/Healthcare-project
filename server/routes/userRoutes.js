const express=require("express");
const router=express.Router();
const { validateJwtToken } = require("../middleware/jwtAuthMiddleware");

const{
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
}=require("../controllers/userController");
// console.log(registerUser,loginUser,getUserProfile,updateUserProfile);

router.post("/register", registerUser);

//route for get the user specific data
router.get("/myaccount", validateJwtToken,getUserProfile);


//route fir updating the user specific data
router.patch("/myaccount",validateJwtToken, updateUserProfile);

//route for user login
router.post("/login",loginUser);

module.exports=router;