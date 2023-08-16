const generateToken = require("../../database/generateToken");
const Faculty = require("../../models/Faculty");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new Error("Invalid username or password");
  const faculty = await Faculty.findOne({ email });
  if (faculty && (await faculty.matchPassword(password))) {
    faculty.password = undefined;
    const token = generateToken(faculty._id);
    return res.status(200).json({ token, faculty });
  }
  console.log(faculty);
  return res.status(400).send("Invalid username or password");
}

const testController = async (req, res) => {
  res.send({ user: req.user, status: "Authenticated" });
}

module.exports = { login, testController }