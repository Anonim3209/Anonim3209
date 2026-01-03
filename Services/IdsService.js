import Id from "../Schemas/Id.js";

class IdsService {
  async create(body) {
    const id = await Id.create(body);
    return id;
  }
  async findOne(body) {
    const id = await Id.findOne(body);
    return id;
  }
  async getAll() {
    const ids = await Id.find({});
    return ids;
  }
  async delete(deletingId) {
    const id = await Id.deleteOne({ idOFLink: deletingId });
    return id;
  }
}

export default new IdsService();
