import User from "../../../backend/models/userModel";
import connectToDb from "./../../../backend/connectToDb";

export const handler = async (req, res) => {
  await connectToDb();
  if (req.method === "POST") {
    const { whatsappName, passwordConfirm, mobile, password } = req.body;

    // check if all fields are filled
    if (!password || !whatsappName || !passwordConfirm || !mobile) {
      return res.status(400).json({ error: "Incomplete Signup Credentials" });
    }

    // check if password and password confirm match
    if (password !== passwordConfirm) {
      return res.status(400).json({ error: "Passwords do not match!" });
    }

    // check if user exists
    const user = await User.findOne({
      mobile,
    }).catch((err) => {
      return res.status(500).json({ error: "Internal Server Error" });
    });

    // throw error if user exists
    if (user) {
      return res.status(409).json({ error: "User already exists!" });
    }

    // create user and hash password
    try {
      const newUser = await User.create({
        whatsappName,
        mobile,
        password,
        passwordConfirm,
      });

      // remove user password from response
      newUser.password = undefined;
      return res.status(201).json({
        status: "success",
        message: "Account created successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  } else {
    return res
      .status(400)
      .json({ error: "No handler defined for this route!" });
  }
};

export default handler;
