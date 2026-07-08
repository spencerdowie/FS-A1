import gameModel from "./model.js";

const getAllGames = async (request, response) => {
  let gameList = await gameModel.getGames();
  //if there's nothing in the pets collection, initialize with some content then get the pets again
  //console.log(gameList);
  if (!gameList.length) {
    //console.log("Creating Data");
    await gameModel.initializeGames();
    gameList = await gameModel.getGames();
  }
  //console.log(gameList);
  response.render("admin/game/index", { games: gameList });
};

const gamesApi = async (req, res) => {
  let gameList = await gameModel.getGames();
  res.json(gameList);
};

//GET
const addGameForm = async (req, res) => {
  let gameList = await gameModel.getGames();
  res.render("admin/game", { addGame: true, games: gameList });
};

//POST
const addGame = async (req, res) => {
  let result = await gameModel.addGame(
    req.body.name,
    req.body.date,
    req.body.url,
    req.body.path
  );
  let gameList = await gameModel.getGames();
  res.render("admin/game/index", { games: gameList });
};

//GET
const editGameForm = async (req, res) => {
  let gameList = await gameModel.getGames();
  //let game = await gameModel.getGameByID(req.query.gameID);
  res.render("admin/game", { editGame: req.query.gameID, games: gameList });
};

//POST
const editGame = async (req, res) => {
  let result = await gameModel.editGame(
    req.body.gameID,
    req.body.name,
    req.body.date,
    req.body.url,
    req.body.path
  );
  let gameList = await gameModel.getGames();
  res.render("admin/game", { games: gameList });
};

const deleteGame = async (req, res) => {
  let result = await gameModel.deleteGameByID(req.body.gameID);
  res.redirect("/admin/game");
};

export default {
  getAllGames,
  gamesApi,
  addGameForm,
  addGame,
  editGameForm,
  editGame,
  deleteGame
};
