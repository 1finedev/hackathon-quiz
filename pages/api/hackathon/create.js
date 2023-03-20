import getSession from "../../../backend/getSession";
import connectToDb from "../../../backend/connectToDb";
import Hackathon from "../../../backend/models/hackatonModel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, version } = req.body;

      if (!name || !version) {
        return res.status(400).json({
          message: "All hackathon parameters must be filled!",
          status: "error",
        });
      }

      await connectToDb();
      const session = await getSession(req, res);
      if (!session)
        return res
          .status(401)
          .json({ message: "Unauthorized", status: "error" });

      await Hackathon.create({
        name,
        version,
      });
      res.status(201).json({
        status: "success",
        message: "Hackathon created successfully",
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message, status: "error" });
    }
  }
}
