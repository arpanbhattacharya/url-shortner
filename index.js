import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import urlRouter from "./routes/url.mjs";
import staticRouter from "./routes/staticRouter.mjs";
import userRouter from "./routes/user.route.mjs";
import { restrictToLoggedInUserOnly } from "./middlewares/auth.mjs";

// express app
const app = express();

// port
const port = process.env.PORT || 7000;

// mongodb connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connected");
    app.listen(port, () => {
      console.log(`Running at port ${port}`);
    });
  })
  .catch((err) => console.log("Error", err));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view-engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(cookieParser());

// root route
app.use("/", staticRouter);

//routes
app.use("/url", restrictToLoggedInUserOnly, urlRouter);
app.use("/user", userRouter);
