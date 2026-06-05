import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongodb+srv://shuklasrishti321_db_user:<sri%40%21%23207>@cluster0.6ozgj9d.mongodb.net/);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;