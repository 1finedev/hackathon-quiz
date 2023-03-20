import Question from "../../../backend/models/questionModel";
import Quiz from "../../../backend/models/quizModel";
import getSession from "../../../backend/getSession";
import connectToDb from "../../../backend/connectToDb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { quizId, questionId, answer } = req.body;

    if (!quizId || !questionId || !answer)
      return res.status(400).json({ error: "Incomplete details" });

    await connectToDb();

    const session = await getSession(req, res);
    if (!session) return res.status(401).json({ error: "Unauthorized!" });

    try {
      const question = await Question.findOne({ _id: questionId }).select(
        "answer"
      );
      if (!question)
        return res.status(404).json({ error: "Question not found!" });

      const quiz = await Quiz.findOne({
        _id: questionId,
      });
      if (!quiz) return res.status(404).json({ error: "Quiz not found!" });

      // update score if answer is correct or wrong
      await Quiz.findOneAndUpdate(
        { _id: quizId },
        {
          $inc: {
            totalCorrect:
              question.answer === answer && Quiz.nextQuestionEndsIn < Date.now()
                ? 1
                : 0,
            questionsAttempted: 1,
          },
          nextQuestionEndsIn: Date.now() + 1000 * 65,
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed!" });
  }
};

export default handler;
