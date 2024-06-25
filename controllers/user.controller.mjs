import User from "../models/user.model.mjs";

export async function addNewUser(req, res) {
  const { name, email, password } = req.body;
  const user = await User.create({
    name: name,
    email: email,
    password: password,
  });

  console.log(user);
  return res.redirect("/");
}

export async function userLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email, password: password });
  if (!user)
    return res.render("login.ejs", {
      error: "Invalid email or password",
    });

  return res.redirect("/");
}
