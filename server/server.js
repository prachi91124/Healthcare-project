//framework configuration
const express=require("express");
const connectDb=require("./config/dbConnection");
const errorHandler=require("./middleware/errorHandler");
const cors = require("cors");
const hbs = require("hbs");
const path = require("path");
const multer = require("multer");
// const upload = multer({dest:'uploads/'})

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
hbs.registerPartials(path.join(__dirname,'/views/partials'));

//routes below
// app.get('/',(req,res)=>{
//     res.send("working");
// });
// app.get('/home',(req,res)=>{
//     //let user = User.findOne({id:})
//     res.render("home",{});
// });
app.get('/home',(req,res)=>{
    res.render('home',{
        name: "Thor",
        marvelname: "God Of Thunder",
        prefix:"MCU"
    })
})

app.get('/',(req,res)=>{
    res.render('users',{
        users:[{id:1,username:"Nitesh", age:23},{id:1, username:"Akash",age:24}],
        prefix:"User Page",
    })
})

app.use("/api/user",require("./routes/userRoutes"));
app.use("/api/doctor",require("./routes/doctorDetailsRoutes"));

//Error handling middleware
app.use(errorHandler);

//app config start
app.listen(port, ()=>{
    console.log(`Server running on port http://localhost:${port}`);
});

app.post('/profile', upload.single('avengers'),function(req,res,next){
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/home");
})

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'/tmp/my-uploads')
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*IE9)
        cb(null,file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer ({storage: storage})