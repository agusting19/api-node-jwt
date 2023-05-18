import mongoose, { ConnectOptions } from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then((db) => {
    console.log("DB is connected");
  })
  .catch((error) => {
    console.log(error);
  });
