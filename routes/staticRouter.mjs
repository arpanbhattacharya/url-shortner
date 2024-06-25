import express from "express";
import { Url } from "../models/url.mjs";
const router = express.Router();

router.get("/", async (req, res) => {
  const allUrls = await Url.find({});
  return res.render("home.ejs", {
    urls: allUrls,
  });
});

router.get("/signup", async (req, res) => {
  return res.render("signup.ejs");
});

router.get("/login", async (req, res) => {
  return res.render("login.ejs");
});

export default router;
