import express from "express";
import {
  generateShortUrl,
  getShortUrlSite,
  getWebsiteAnalytics,
} from "../controllers/url.mjs";

const router = express.Router();

router.post("/", generateShortUrl);

router.get("/:id", getShortUrlSite);

router.get("/analytics/:id", getWebsiteAnalytics);

export default router;
