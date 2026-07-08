import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  name: String,
  releaseYear: String,
  url: String,
  thumbnailPath: String
}); //, { collection: "games"});
const Game = mongoose.model("Game", GameSchema);

//MONGODB FUNCTIONS

//Get all games from the games collection
async function getGames() {
  return await Game.find({}); //return array for find all
}

async function getGameByID(gameID) {
  let result = await Game.findById(gameID);
  return result;
}

//Initialize games collection with some initial data
async function initializeGames() {
  const gameList = [
    {
      name: "SLIH",
      releaseYear: "2020",
      url: "https://augex.itch.io/some-like-it-hot",
      thumbnailPath: "logo_somelikeithot.png"
    },
    {
      name: "DEW",
      releaseYear: "2026",
      url: "https://augex.itch.io/dew",
      thumbnailPath: "DEW_Logo.jpg"
    }
  ];
  await Game.insertMany(gameList);
}

async function addGame(name, releaseYear, url, path) {
  let newGame = new Game({
    name: name,
    releaseYear: releaseYear,
    url: url,
    thumbnailPath: path
  });
  let result = await newGame.save();

  return result === newGame ? true : false;
}

async function editGame(id, name, releaseYear, url, path) {
  let result = await Game.findByIdAndUpdate(id, {
    name: name,
    releaseYear: releaseYear,
    url: url,
    thumbnailPath: path
  });

  return result.modifiedCount == 1 ? true : false;
}

async function deleteGameByID(gameID) {
  let result = await Game.deleteOne({ _id: gameID });
  return result.deletedCount == 1;
}

export default {
  initializeGames,
  getGames,
  getGameByID,
  addGame,
  editGame,
  deleteGameByID
};
