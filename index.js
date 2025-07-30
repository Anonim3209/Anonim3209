import express from "express";
import path from "path";
import http from "http";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import router from "./router.js";
import cors from "cors";
import { SetupWebsocket } from "./wss.js";
import mongoose from "mongoose";

// Определение __dirname (для ES-модуля)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Загрузка переменных окружения
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const DbUrl = process.env.DbURL;

// HTTP-сервер для WebSocket
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cors());

// ⚠️ ВАЖНО: раздача статических файлов из папки public
app.use(express.static(path.join(__dirname, "public")));

// Основной маршрутизатор
app.use("", router);

// Настройка WebSocket
SetupWebsocket(server);

// Запуск сервера и подключение к MongoDB
const start = async () => {
  try {
    await mongoose.connect(DbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    server.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (e) {
    console.error(" Failed to start the server:", e.message);
  }
};

// Старт
start();

// Экспорт __dirname для использования в router.js
export { __dirname };
