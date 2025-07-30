import htmlQuestion from "../Schemas/htmlQuestion.js";

class htmlQuestionService {
  async create(body) {
    const question = await htmlQuestion.create(body);
    return question;
  }
  async getAllQuestions() {
    const questions = await htmlQuestion.find({});
    return questions;
  }
}

export default new htmlQuestionService();
