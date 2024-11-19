const mongoose = require ("mongoose");

const letterSchema = mongoose.Schema(
    {
        title:{
            type:String,
            require: [true,"Please enter the title"]
        },
        author:{
            type: String,
            require:[true, "Please enter the name of author"]
        },
        date:{
            type: Date,
            require:[true, "Please enter the date"]
        },
        description:{
            type: String,
            require:[true,"Please enter the description"]
        },
        imageUrl:{
            type: String,
            require: [true,"Please enter the imageUrl"]
        }
    }
);

const letter = mongoose.model("letter",letterSchema);
module.exports = letter;