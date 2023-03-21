import connectToDb from "../../../backend/connectToDb";
import Quiz from "../../../backend/models/quizModel";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    await connectToDb();

    try {
      const quiz = await Quiz.find({ user: userId });

      if (quiz.length > 0) {
        return res.status(200).json({ quiz });
      } else {
        return res.status(200).json({ message: "No quiz found" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
};
export default handler;
