import express from "express";
const router = express.Router();

import gamesController from "./controller.js";

router.get("/api/games", gamesController.gamesApi);

router.get("/admin/game/add", gamesController.addGameForm);

router.post("/admin/game/add", gamesController.addGame);

router.get("/admin/game/edit", gamesController.editGameForm);

router.post("/admin/game/edit", gamesController.editGame);

router.post("/admin/game/delete", gamesController.deleteGame);

router.get("/admin/game", gamesController.getAllGames);

export default router;
