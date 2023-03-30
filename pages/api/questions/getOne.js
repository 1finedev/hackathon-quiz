import Question from "../../../backend/models/questionModel";
import Quiz from "../../../backend/models/quizModel";
import getSession from "../../../backend/getSession";
import connectToDb from "../../../backend/connectToDb";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { quizId } = req.body;

    if (!quizId) return res.status(400).json({ error: "Quiz Id is required!" });

    await connectToDb();

    const session = await getSession(req, res);
    if (!session) return res.status(401).json({ error: "Unauthorized!" });

    try {
      const quiz = await Quiz.findById(quizId);
      if (!quiz) return res.status(404).json({ error: "Quiz not found!" });

      if (quiz.totalAttempted === 20) {
        return res.status(400).json({
          error: "Quiz already completed!",
          score: quiz.totalCorrect,
        });
      }

      const attempted = quiz.questionsAttempted.map(
        (attempted) => new mongoose.Types.ObjectId(attempted)
      );

      // random question from the category excluding the attempted questions
      const question = await Question.aggregate([
        { $match: { _id: { $nin: attempted }, category: quiz.category } },
        { $sample: { size: 1 } },
      ]);

      if (!question.length > 0)
        return res.status(404).json({ error: "No question found!" });

      await Quiz.findOneAndUpdate(
        { _id: quiz._id },
        {
          $push: { questionsAttempted: question[0]._id },
          nextQuestionEndIn: Date.now() + 1000 * 65,
          $inc: { totalAttempted: 1 },
        }
      );

      return res.status(200).json({
        status: "success",
        question: question[0],
        totalAttempted: quiz.totalAttempted,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed!" });
  }
}
