const mongoose = require("mongoose");


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URLSTRING}/${process.env.DB_NAME}`)
        console.log(`MongoDb conncted !! DB Host: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1);
    }
}

module.exports = connectDB;

