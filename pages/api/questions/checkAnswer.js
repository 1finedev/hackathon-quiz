import Question from "../../../backend/models/questionModel";
import Quiz from "../../../backend/models/quizModel";
import getSession from "../../../backend/getSession";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const session = await getSession(req, res);
    if (!session) return res.status(401).json({ error: "Unauthorized!" });

    const { quizId, questionId, answer } = req.body;

    if (!quizId || !questionId || !answer)
      return res.status(400).json({ error: "Incomplete details" });

    try {
      const question = await Question.findOne({ _id: questionId });
      if (!question)
        return res.status(404).json({ error: "Question not found!" });

      // update score if answer is correct or wrong

      if (question.answer === answer) {
        await Quiz.findOneAndUpdate(
          { _id: quizId },
          {
            $inc: {
              totalCorrect: 1,
              questionsAttempted: 1,
            },
          }
        );
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed!" });
  }
};

export default handler;
