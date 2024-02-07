import express from "express";
import connectDB from "./db.js";
import router from "./routes/routes.js";
import dotenv from "dotenv";
import multer from "multer";
import bodyParser from "body-parser";

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


connectDB();
app.use(router);
dotenv.config();

app.listen(3000, () => {
  console.log("listening");
});
