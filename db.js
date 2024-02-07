import mongoose from "mongoose";

const connectionURL =
  "mongodb+srv://aishwarya:test@cluster0.ndpibif.mongodb.net/";

const connectDB = () => {
  const connect = () => {
    mongoose
      .connect(connectionURL, {dbName: 'aunthentication'})
      .then((result) => console.log("connected"))
      .catch((err) => console.log(err));
  };
  connect();
};
export default connectDB;
