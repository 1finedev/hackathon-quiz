import { authOptions } from "../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

const getSession = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  return session;
};
export default getSession;
