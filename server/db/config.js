import mongoose from "mongoose";

const config = async () => {
  try {
    await mongoose.connect(process.env.MONOGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is Connected!")
  } catch (error) {
    console.log("Error in Connecting to MONOGO_DB", error.message);
  }
};

export default config;
