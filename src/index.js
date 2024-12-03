const dotenv = require("dotenv");
const connectDB = require("./config/indexDB");
const nodemailer = require('nodemailer');

const app = require("./app");

dotenv.config();
// make express app


//connect to database
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`!! Server is runing at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB DB connnection failed !!!", err);
  });
