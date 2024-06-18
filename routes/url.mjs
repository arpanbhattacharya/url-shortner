import express from "express";
import {
  generateShortUrl,
  getShortUrlSite,
  getWebsiteAnalytics,
  renderUrlOnFrontend,
} from "../controllers/url.mjs";

const router = express.Router();

router.route("/").post(generateShortUrl).get(renderUrlOnFrontend);

router.get("/:id", getShortUrlSite);

router.get("/analytics/:id", getWebsiteAnalytics);

export default router;
