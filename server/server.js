const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const hbs = require("hbs");
const path = require("path");
const multer = require("multer");

const dotenv = require("dotenv");
dotenv.config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "/views/partials"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = file.fieldname + "-" + uniqueSuffix + fileExtension;

        cb(null, filename);
    },
});

const upload = multer({ storage: storage });

app.get("/home", (req, res) => {
    res.render("home", {
        name: "Thor",
        marvelname: "God Of Thunder",
        prefix: "Asgard",
    });
});

app.get("/", (req, res) => {
    res.render("users", {
        users: [
            { id: 1, username: "Nitesh", age: 23 },
            { id: 2, username: "Akash", age: 24 },
        ],
        prefix: "User Page",
    });
});

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/doctor", require("./routes/doctorDetailsRoutes"));

app.use(errorHandler);

app.post("/profile", upload.single("avengers"), function (req, res, next) {
    const file = req.file;
    if (file) {
        res.render("home", {
            fileUrl: `/uploads/${file.filename}`, 
        });
    } else {
        res.status(400).send("No file uploaded");
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});