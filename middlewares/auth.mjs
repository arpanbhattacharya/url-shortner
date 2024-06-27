import { getUser } from "../services/auth.mjs";

async function restrictToLoggedInUserOnly(req, res, next) {
  const userToken = req.cookies?.token;
  if (!userToken) return res.redirect("/login");

  const user = getUser(userToken);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userToken = req.cookies?.token;

  const user = getUser(userToken);

  req.user = user;
  next();
}

export { restrictToLoggedInUserOnly, checkAuth };
