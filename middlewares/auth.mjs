import { getUser } from "../services/auth.mjs";

async function restrictToLoggedInUserOnly(req, res, next) {
  const userUid = req.cookies.uid;
  if (!userUid) return res.redirect("/login");

  const user = getUser(userUid);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

export { restrictToLoggedInUserOnly };
