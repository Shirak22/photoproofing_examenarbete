import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGODB_URI as string
    );

    console.log(`Connected to ${connection.connection.host}`);
    return connection;
  } catch (error) {
    throw new Error(`Error connecting to database: ${error}`);
  }
};
