import Questions from "../../../backend/models/questionModel";
import getSession from "../../../backend/getSession";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getSession(req, res);
    if (!session)
      return res.status(401).json({ message: "Unauthorized", status: "error" });

    const { question, options, answer, category } = req.body;

    try {
      if (!question || !options || !answer || !category) {
        res.status(400).json({
          message: "All question parameters must be filled!",
          status: "error",
        });
      }

      const question = await Questions.create({
        question,
        options,
        answer,
        category,
      });

      res.status(201).json(question);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message, status: "error" });
    }
  }
}
