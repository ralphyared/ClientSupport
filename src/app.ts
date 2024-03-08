import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();

const connectDB = async () => {
  await mongoose.connect(process.env.DB_URL!);
};

try {
  connectDB();
  console.log("App successfully connected to database");
} catch (err) {
  throw err;
}

app.listen(3000, () => {
  console.log(`App listening at port ${process.env.PORT}...`);
});
