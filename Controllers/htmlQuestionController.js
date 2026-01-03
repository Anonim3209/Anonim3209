import htmlQuestionService from "../Services/htmlQuestionService.js";

class htmlQuestionController {
  async createQuestion(req, res) {
    const htmlQuestion = await htmlQuestionService.create(req.body);
    return htmlQuestion;
  }
  async getQuestion(req, res) {
    const htmlQuestion = await htmlQuestionService.getAllQuestions();
    res.status(200).send(JSON.stringify(htmlQuestion));
  }
}

export default new htmlQuestionController();
