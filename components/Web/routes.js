import express from "express";
const router = express.Router();

import webController from "./controller.js";

router.get("/api/web", webController.webProjectsApi);

router.get("/admin/web/add", webController.addWebProjectForm);

router.post("/admin/web/add", webController.addWebProject);

router.get("/admin/web/edit", webController.editWebProjectForm);

router.post("/admin/web/edit", webController.editWebProject);

router.post("/admin/web/delete", webController.deleteWebProject);

router.get("/admin/web", webController.getAllWebProjects);

export default router;
