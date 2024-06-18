import { nanoid } from "nanoid";
import { URL } from "../models/url.mjs";

export async function generateShortUrl(req, res) {
  const id = nanoid(10);
  const body = req.body;
  if (!body.url) return res.status(400).json({ msg: "url required" });
  const data = await URL.create({
    shortId: id,
    redirectUrl: body.url,
    visitHistory: [],
  });

  console.log(data);
  return res.status(201).json({ id: id });
}

export async function getShortUrlSite(req, res) {
  const shortId = req.params.id;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          time: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
}

export async function getWebsiteAnalytics(req, res) {
  const shortId = req.params.id;
  const history = await URL.findOne({ shortId });
  return res.status(200).json({
    totalClicks: history.visitHistory.length,
    analytics: history.visitHistory,
  });
}
