import mongoose from "mongoose";

const WebSchema = new mongoose.Schema({
  name: String,
  releaseYear: String,
  url: String
}); //, { collection: "games"});
const Web = mongoose.model("Web", WebSchema);

//MONGODB FUNCTIONS

//Get all projects from the web projects collection
async function getWebProjects() {
  return await Web.find({}); //return array for find all
}

async function getWebByID(webID) {
  let result = await Web.findById(webID);
  return result;
}

//Initialize web projects collection with some initial data
async function initializeWebProjects() {
  const webProjList = [
    {
      name: "SLIH",
      releaseYear: "2020"
    },
    {
      name: "DEW",
      releaseYear: "2026"
    }
  ];
  await Web.insertMany(webProjList);
}

async function addWebProject(name, releaseYear, url) {
  let newWebProject = new Web({
    name: name,
    releaseYear: releaseYear,
    url: url
  });
  let result = await newWebProject.save();

  return result === newWebProject ? true : false;
}

async function editWebProject(id, name, releaseYear, url) {
  let result = await Web.findByIdAndUpdate(id, {
    name: name,
    releaseYear: releaseYear,
    url: url
  });

  return result.modifiedCount == 1 ? true : false;
}

async function deleteWebProjectByID(webID) {
  let result = await Web.deleteOne({ _id: webID });
  return result.deletedCount == 1;
}

export default {
  initializeWebProjects,
  getWebProjects,
  getWebByID,
  addWebProject,
  editWebProject,
  deleteWebProjectByID
};
