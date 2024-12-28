import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}`);
    console.log("Connected to MongoDb");
  } catch (err: unknown) {
    console.log("Error connecting to mongodb");
  }
};

export default connectToDb;
