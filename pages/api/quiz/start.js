import connectToDb from "../../../backend/connectToDb";
import User from "../../../backend/models/userModel";
import Quiz from "../../../backend/models/quizModel";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { userId, category } = req.body;
    if (!userId || !category)
      return res
        .status(400)
        .json({ status: "error", message: "Incomplete details" });

    await connectToDb();
    const user = await User.findOne({ _id: userId }).catch((err) => {
      return res.status(500).json({ error: "Internal Server Error" });
    });

    if (!user) return res.status(404).json({ error: "User not found!" });

    const quiz = await Quiz.findOne({ user: user._id, category });

    if (quiz) {
      return res.status(400).json({
        status: "error",
        message: "Quiz already started!",
        quiz,
      });
    }

    Quiz.create({
      user: userId,
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
  }
};

export default handler;
