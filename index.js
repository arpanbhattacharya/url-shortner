import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import urlRouter from "./routes/url.mjs";

// express app
const app = express();

// port
const port = process.env.PORT || 7000;

// mongodb connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected"))
  .catch((err) => console.log("Error", err));

// middlewares
app.use(express.json());

// root route
app.get("/", (req, res) => {
  res.send("Hello");
});

//routes
app.use("/url", urlRouter);

// server
app.listen(port, () => {
  console.log(`Running at port ${port}`);
});
