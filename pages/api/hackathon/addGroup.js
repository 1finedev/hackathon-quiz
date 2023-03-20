import getSession from "../../../backend/getSession";
import connectToDb from "../../../backend/connectToDb";
import Hackathon from "../../../backend/models/hackatonModel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { hackathonId, groupId } = req.body;
      // The id can either be from the body or param, not sure

      if (!hackathonId) {
        return res.status(400).json({
          message: "hackathon id is needed to add group to the hackathon",
          status: "error",
        });
      }

      if (!groupId) {
        return res.status(400).json({
          message: "Group id is needed to add group to the hackaton",
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

      hackathon.groups = [...hackathon.groups, id];

      hackathon.save();

      res.status(201).json({
        status: "success",
        message: "Group added succesfully",
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message, status: "error" });
    }
  }
}
