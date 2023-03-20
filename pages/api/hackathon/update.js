import getSession from "../../../backend/getSession";
import connectToDb from "../../../backend/connectToDb";
import Hackathon from "../../../backend/models/hackatonModel";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    try {
      const { id, name, version } = req.body;
      // The id can either be from the body or param, not sure

      if (!id) {
        return res.status(400).json({
          message: "An id is needed to update an Hackathon",
          status: "error",
        });
      }

      await connectToDb();
      const session = await getSession(req, res);

      if (!session)
        return res
          .status(401)
          .json({ message: "Unauthorized", status: "error" });

      const hackathon = await Hackathon.findById(id);

      if (name) {
        hackathon.name = name;
      }

      if (version) {
        hackathon.version = version;
      }

      hackathon.save();

      res.status(201).json({
        status: "success",
        message: "Hackathon updated successfully",
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message, status: "error" });
    }
  }
}
