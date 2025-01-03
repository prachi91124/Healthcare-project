const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please add your name"],
        },
        email: {
            type: String,
            required: [true, "please add your Email"],
        },
        phoneNumber: {
            type: String,
            required: [true, "please add your Phone Number"],
        },
        password: {
            type: String,
            required: [true, "please add your password"],
        },
    },
    {
        timestamps: true
    }
);
const  User = mongoose.model("User", userSchema);
module.exports = User;