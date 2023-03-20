import getSession from "../../../backend/getSession";
import connectToDb from "../../../backend/connectToDb";
import Hackathon from "../../../backend/models/hackatonModel";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      // It can be either body or param, not sure

      if (!id) {
        return res.status(400).json({
          message: "An id is needed to delete an Hackathon",
          status: "error",
        });
      }

      await connectToDb();
      const session = await getSession(req, res);

      if (!session)
        return res
          .status(401)
          .json({ message: "Unauthorized", status: "error" });

      await Hackathon.findByIdAndDelete(id);
      res.status(201).json({
        status: "success",
        message: "Hackathon deleted successfully",
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message, status: "error" });
    }
  }
}
