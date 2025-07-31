import { Router } from "express";
import { __dirname } from "./index.js";
import path from "path";
import IdsController from "./Controllers/IdsController.js";
import htmlQuestionController from "./Controllers/htmlQuestionController.js";

const router = new Router();

router.get("/admin-panel", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
router.get("/lms", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "lms.html"));
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
