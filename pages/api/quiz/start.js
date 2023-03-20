import { connectToDb } from "../../../backend/connectToDb";
import User from "../../../backend/models/userModel";
import Quiz from "../../../backend/models/quizModel";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { userId } = req.body;
    if (!userId)
      return res
        .status(400)
        .json({ status: "error", message: "Incomplete details" });

    await connectToDb();
    const user = await User.findOne({ _id: userId }).catch((err) => {
      return res.status(500).json({ error: "Internal Server Error" });
    });

    if (!user) return res.status(404).json({ error: "User not found!" });

    Quiz.create({
      user: userId,
    })
      .then(() => {
        return res
          .status(201)
          .json({ status: "success", message: "Quiz started successfully" });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
      });
  }
};

export default handler;
