import connectToDb from "../../../backend/connectToDb";
import Group from "../../../backend/models/groupModel";
import getSession from "../../../backend/getSession";
import User from "../../../backend/models/userModel";

const handler = async (req, res) => {
  if (req.method === "GET") {
    await connectToDb();
    const session = await getSession(req, res);
    if (!session) return res.status(401).json({ error: "Unauthorized!" });

    const group = await Group.find({
      members: { $in: [session.user._id] },
    }).populate({
      path: "members",
      select: "whatsappName mobile",
      model: User,
    });

    res.status(200).json(group);
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
};
export default handler;
