require("dotenv").config();
const mongoose = require("mongoose");
console.log(process.env.MONGO_URL);

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(`\n MONGPDB connected!! HOST: ${connection.connection.host}`);
  } catch (error) {
    console.error("MONGODB connection error", error);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
};
