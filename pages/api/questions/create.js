import Question from "../../../backend/models/questionModel";
import getSession from "../../../backend/getSession";
import connectToDb from "../../../backend/connectToDb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { question, options, answer, category } = req.body;

      if (!question || !options || !answer || !category) {
        return res.status(400).json({
          message: "All question parameters must be filled!",
          status: "error",
        });
      }

      await connectToDb();
      const session = await getSession(req, res);
      if (!session)
        return res
          .status(401)
          .json({ message: "Unauthorized", status: "error" });

      await Question.create({
        question,
        options,
        answer,
        category,
      });
      res.status(201).json({
        status: "success",
        message: "Question created successfully",
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message, status: "error" });
    }
  }
}
