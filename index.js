import express from "express";
import path from "path";
import http from "http";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import router from "./router.js";
import cors from "cors";
import { SetupWebsocket } from "./wss.js";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const port = 3000;
const DbUrl = process.env.DbURL;

const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use("", router);
SetupWebsocket(server);

const start = async () => {
  try {
    await mongoose.connect(DbUrl);

    server.listen(port, () => {
      console.log(`Server work's at http://localhost:${port}`);
    });
  } catch (e) {
    console.error("Failed to start the server", e.message);
  }
};

start();
export { __dirname };
