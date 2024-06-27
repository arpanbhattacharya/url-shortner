import { nanoid } from "nanoid";
import { Url } from "../models/url.mjs";

export async function generateShortUrl(req, res) {
  const id = nanoid(10);
  const body = req.body;
  if (!body.url) return res.status(400).json({ msg: "Url required" });
  const data = await Url.create({
    shortId: id,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  console.log(data);
  return res.render("home.ejs", {
    id: id,
  });
}

export async function getShortUrlSite(req, res) {
  const shortId = req.params.id;
  const entry = await Url.findOneAndUpdate(
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
  const history = await Url.findOne({ shortId });
  return res.status(200).json({
    totalClicks: history.visitHistory.length,
    analytics: history.visitHistory,
  });
}

export async function showAllUrls(req, res) {
  const allUrls = await Url.find({});
  if (!allUrls) return res.status(404).json({ msg: "No url found" });

  return res.status(200).send(allUrls);
}
