const mongoose = require("mongoose");
const config = require("config");
const db = config.get("MONGO_URI");
let dbConnection

const connectDB = async () => {
  try {
    dbConnection = await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.log(error.message);
  }
};

const disconnectDB = async ()=>{
  await dbConnection.disconnect()
  console.log("Database disconnected");
}

module.exports = {connectDB, disconnectDB};
