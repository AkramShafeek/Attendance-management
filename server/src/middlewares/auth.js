const jwt = require('jsonwebtoken');
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');

const authenticate = async (TargetModel, req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await TargetModel.findById(decoded.id).select("-password");
    return true;
  } catch (error) {
    throw new Error('Not authorized to access this route');
  }
}

const facultyAuthMiddleware = async (req, res, next) => {
  await authenticate(Faculty, req);
  next();
}

const studentAuthMiddleware = async (req, res, next) => {
  await authenticate(Student, req);
  next();
}

// const adminAuthMiddleware = async (req, res, next) => {
//   await authenticate(Admin, req);
//   next();
// }

module.exports = { facultyAuthMiddleware, studentAuthMiddleware };