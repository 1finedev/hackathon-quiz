import Questions from "../../../backend/models/questionModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const questions = await Questions.findOne();

      res.status(200).json(questions);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ error: error.message });
    }
  }
}
