import express from "express";
const router = express.Router();

router.get("/admin", (req, res) => {
  if (req.session.loggedIn == true) {
    res.render("admin");
  } else {
    res.redirect("/");
  }
});

router.get("/", (req, res) => {
  res.render("index");
});

export default router;
