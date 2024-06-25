import express from "express";
import {
  generateShortUrl,
  getShortUrlSite,
  getWebsiteAnalytics,
  showAllUrls,
} from "../controllers/url.mjs";

const router = express.Router();

router.route("/").post(generateShortUrl).get(showAllUrls);

router.get("/:id", getShortUrlSite);

router.get("/analytics/:id", getWebsiteAnalytics);

export default router;
