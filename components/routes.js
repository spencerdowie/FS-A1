import gameModel from "./Games/model.js";
import webModel from "./Web/model.js";

import express from "express";
const router = express.Router();

router.get("/admin", (req, res) => {
  if (req.session.loggedIn == true) {
    res.render("admin");
  } else {
    res.redirect("/");
  }
});

router.get("/", async (req, res) => {
  let gameList = await gameModel.getGames();
  let webList = await webModel.getWebProjects();
  res.render("index", { games: gameList, webProjects: webList });
});

export default router;
