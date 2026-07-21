import mongoose from "mongoose";
import dns from "dns";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);

    dns.setServers(["8.8.8.8", "8.8.4.4"]);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:");
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;