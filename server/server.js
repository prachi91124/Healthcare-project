//framework configuration
const express=require("express");
const connectDb=require("./config/dbConnection");
const errorHandler=require("./middleware/errorHandler");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

connectDb();
const app=express();
const port=process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
//error handling middleware
app.use(errorHandler);

app.set('view engine','hbs');

//routes below
app.get('/',(req,res)=>{
    res.send("working");
});
app.get('/home',(req,res)=>{
    //let user = User.findOne({id:})
    res.render("home",{});
});


//app config start
app.listen(port, ()=>{
    console.log(`Server running on port http://localhost:${port}`);
});

