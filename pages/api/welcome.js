const handler = async (req, res) => {
  if (req.method === "POST") {
    res.status(200).json({ name: "John Doe" });
  }
};

export default handler;
