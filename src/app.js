const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");



const app = express();

// Cors Policy Credentials
app.use(cors({
    origin: process.env.CORS_ORIGIN || 8080,
    credentials: true
}))

//body parser with JSON
app.use(express.json({limit: "80kb"}));
app.use(express.urlencoded({extended: true, limit: "20kb"}))
app.use(express.static("public"));
app.use(cookieParser());

//routes Links 
app.use("/api/v1/users", require("./routes/User/user.routes"));
app.use('/api/v1/tutorial', require('./routes/Tutorial/tutorial.routes'));
app.use('/api/v1/subtutorial', require('./routes/Tutorial/subtutorial.routes'));
app.use('/api/v1/detailsubtutorial', require('./routes/Tutorial/detailstutorial.routes'));
//http://localhost:8080/api/v1/users


module.exports = app;
