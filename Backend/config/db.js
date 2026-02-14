import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/MalikStore");
    console.log(`MongoDB connecté `);
  } catch (error) {
    console.error(`Erreur de connexion `);
    process.exit(1);
  }
};

export default connectDB;
