import { Router } from "express";
import { __dirname } from "./index.js";
import path from "path";
import IdsController from "./Controllers/IdsController.js";
import htmlQuestionController from "./Controllers/htmlQuestionController.js";

const router = new Router();

// Панель администратора
router.get("/admin-panel", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Страница с вопросами и входами
router.get("/questions", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "questionsAndEntrances.html"));
});

// 📌 Новый чистый маршрут для симулятора LMS
router.get("/lms", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "questionsAndEntrances.html"));
});

// API: Добавление нового HTML-вопроса
router.post("/new-html-question", htmlQuestionController.createQuestion);

// API: Получение всех HTML-вопросов
router.get("/get-the-htmlQuestions", htmlQuestionController.getQuestion);

// Сценарий по ID
router.get("/s/:id", IdsController.getTheScript);

// Создание нового ID
router.post("/newId", IdsController.createId);

// Удаление ID
router.delete("/test/:id", IdsController.delete);

// Получение всех ID
router.get("/all-ids", IdsController.getAll);

export default router;
