const Class = require('../../models/Class');
const Dept = require('../../models/Department');

const fetchClass = async (req, res) => {
  const classes = await Class.find().sort('dept year sem section').populate('dept');
  res.status(200).send(classes);
}

const createClass = async (req, res) => {
  const existingDept = await Dept.findOne({ _id: req.body.dept });
  if (!existingDept)
    throw new Error("Give Department doesn't exist");
  const existingClass = await Class.findOne(req.body);
  if (existingClass)
    throw new Error("Class Already exists");

  const newClass = await Class.create(req.body);
  const response = await Class.findById(newClass._id).populate('dept');

  res.status(200).send(response);
}

const editClass = async (req, res) => {
  if (!req.body._id)
    throw new Error("Class id not provided");

  const { dept, sem, year, section } = req.body;
  const existingClass = await Class.findOne({ $and: [{ dept, sem, year, section }] });
  if (existingClass) {
    console.log(existingClass);
    throw new Error("Class already exists");
  }

  const id = req.body._id;
  const updatedClass = await Class.findByIdAndUpdate(id, req.body, { new: true });

  if (!updatedClass)
    throw new Error("Class doesn't exist");

  const response = await Class.findById(updatedClass._id).populate('dept');  

  res.status(200).send(response);
}

const deleteClass = async (req, res) => {
  if (!req.body._id)
    throw new Error("Class id not provided");

  const id = req.body._id;
  const _class = await Class.deleteOne({ _id: id });

  if (!_class)
    throw new Error("Class doesn't exist");

  res.status(200).send(_class);
}

module.exports = {
  fetchClass,
  createClass,
  editClass,
  deleteClass
}