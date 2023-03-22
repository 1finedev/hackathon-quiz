import connectToDb from "../../../backend/connectToDb";
import Quiz from "../../../backend/models/quizModel";
import getSession from "../../../backend/getSession";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { category } = req.body;
    if (!category)
      return res
        .status(400)
        .json({ status: "error", message: "Incomplete details" });

    await connectToDb();

    const session = await getSession(req, res);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const quiz = await Quiz.findOne({ user: session.user._id, category });

    if (quiz) {
      return res.status(409).json({
        status: "error",
        message: "Quiz already started!",
        quiz,
      });
    }

    Quiz.create({
      user: session.user._id,
      category,
    })
      .then((quiz) => {
        return res.status(201).json({
          status: "success",
          message: "Quiz started successfully",
          quiz,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
      });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
