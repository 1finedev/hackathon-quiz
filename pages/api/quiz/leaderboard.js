import Quiz from "../../../backend/models/quizModel";
import connectToDb from "../../../backend/connectToDb";

const handler = async (req, res) => {
  if (req.method === "GET") {
    res.status(200).json({ results });
  } else {
    res.status(400).json({ error: "Invalid request method" });
  }
};

export default handler;
