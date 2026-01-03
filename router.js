import { Router } from "express";
import { __dirname } from "./index.js";
import path from "path";
import IdsController from "./Controllers/IdsController.js";
import htmlQuestionController from "./Controllers/htmlQuestionController.js";
import fs from "fs";

const router = new Router();

router.get("/admin-panel", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin-panel.html"));
});
router.get("/answer", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "answer.html"));
});
router.get("/list-of-currentTesters", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "listOfCurrentTesters.html"));
});
router.get("/questions", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "questionsAndEntrances.html"));
});
router.post("/new-html-question", htmlQuestionController.createQuestion);
router.get("/get-the-htmlQuestions", htmlQuestionController.getQuestion);
router.get("/s/:id", IdsController.getTheScript);
router.post("/newId", IdsController.createId);
router.delete("/test/:id", IdsController.delete);
router.get("/all-ids", IdsController.getAll);

export default router;
