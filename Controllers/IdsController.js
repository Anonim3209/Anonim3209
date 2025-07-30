import path from "path";
import { __dirname } from "../index.js";
import IdsService from "../Services/IdsService.js";
import fs from "fs";

class IdsController {
  async createId(req, res) {
    const id = await IdsService.findOne(req.body);
    if (id) {
      return res.send("This id is using");
    } else {
      const createId = await IdsService.create(req.body);
      return res.json(createId);
    }
  }
  async getTheScript(req, res) {
    const { idOFLink } = await IdsService.findOne({ idOFLink: req.params.id });
    if (idOFLink) {
      const scriptPath = path.join(__dirname, "public", "script.js");
      fs.readFile(scriptPath, "utf8", (err, data) => {
        if (err) return res.status(500).send("Ошибка загрузки скрипта");

        // Заменяем плейсхолдер на реальный id
        const scriptWithId = data.replace(/{{ID}}/g, idOFLink);

        res.setHeader("Content-Type", "application/javascript");
        res.send(scriptWithId);
      });
    } else {
      res.status(400);
      res.send("");
    }
  }
  async getAll(req, res) {
    const ids = await IdsService.getAll();
    return res.json(ids);
  }
  async delete(req, res) {
    const id = await IdsService.delete(req.params.id);
    return res.json(id);
  }
}

export default new IdsController();
