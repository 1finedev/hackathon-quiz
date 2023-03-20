import Question from "../../../backend/models/questionModel";
import Quiz from "../../../backend/models/quizModel";
import getSession from "../../../backend/getSession";
import connectToDb from "../../../backend/connectToDb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { quizId } = req.body;

    if (!quizId) return res.status(400).json({ error: "Quiz Id is required!" });

    await connectToDb();

    const session = await getSession(req, res);
    if (!session) return res.status(401).json({ error: "Unauthorized!" });

    try {
      const quiz = await Quiz.findOneById(quizId);
      if (!quiz) return res.status(404).json({ error: "Quiz not found!" });

      if (quiz.questionsAttempted.length === 20) {
        return res.status(400).json({
          status: "error",
          message: "Quiz already completed!",
          score: quiz.totalCorrect,
        });
      }
      const question = await Question.findOne({
        _id: { $nin: [quiz.questionsAttempted] },
      }).catch((err) => {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
      });

      if (!question)
        return res.status(404).json({ error: "No question found!" });

      await Quiz.findOneAndUpdate(
        { _id: quiz._id },
        {
          $push: { questionsAttempted: question._id },
          nextQuestionEndIn: Date.now() + 1000 * 65,
        }
      );

      res.status(200).json({
        status: "success",
        question,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed!" });
  }
}
