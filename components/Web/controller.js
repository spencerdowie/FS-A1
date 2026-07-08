import webModel from "./model.js";

const getAllWebProjects = async (request, response) => {
  let webList = await webModel.getWebProjects();
  //if there's nothing in the pets collection, initialize with some content then get the pets again
  if (!webList.length) {
    await webModel.initializeWebProjects();
    webList = await webModel.getWebProjects();
  }
  //console.log(gameList);
  response.render("admin/web/index", { projects: webList });
};

const webProjectsApi = async (req, res) => {
  let webList = await webModel.getWebProjects();
  res.json(webList);
};

//GET
const addWebProjectForm = async (req, res) => {
  let webList = await webModel.getWebProjects();
  res.render("admin/web", { addProject: true, projects: webList });
};

//POST
const addWebProject = async (req, res) => {
  let result = await webModel.addWebProject(
    req.body.name,
    req.body.date,
    req.body.url
  );
  let webList = await webModel.getWebProjects();
  res.render("admin/web/index", { projects: webList });
};

//GET
const editWebProjectForm = async (req, res) => {
  let webList = await webModel.getWebProjects();
  //let project = await webModel.getWebByID(req.query.webID);
  res.render("admin/web/edit", {
    editProject: req.query.webID,
    projects: webList
  });
};

//POST
const editWebProject = async (req, res) => {
  let result = await webModel.editWebProject(
    req.body.gameID,
    req.body.name,
    req.body.date,
    req.body.url
  );
  let webList = await webModel.getWebProjects();
  res.render("admin/game", { projects: webList });
};

const deleteWebProject = async (req, res) => {
  let result = await webModel.deleteWebProjectByID(req.body.webID);
  res.redirect("/admin/web");
};

export default {
  getAllWebProjects,
  webProjectsApi,
  addWebProjectForm,
  addWebProject,
  editWebProjectForm,
  editWebProject,
  deleteWebProject
};
