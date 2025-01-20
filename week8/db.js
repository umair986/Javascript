const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://mohumair1901:mohumair1901@cluster0.r4h0l.mongodb.net/course-selling-app-week8"
    );
    console.log(`\n MONGPDB connected!! HOST: ${connection.connection.host}`);
  } catch (error) {
    console.error("MONGODB connection error", error);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
};
