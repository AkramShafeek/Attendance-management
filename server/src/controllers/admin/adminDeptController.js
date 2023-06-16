const Dept = require('../../models/Department');

const createDept = async (req, res) => {
    const deptExists = await Dept.findOne({ deptId: req.body.deptId });
    if (deptExists)
        throw new Error('Department already exists');

    const newDept = await Dept.create(req.body);
    res.status(200).send(newDept);
}

const fetchDepts = async (req, res) => {
    const depts = await Dept.find();
    res.status(200).send(depts);
}

const editDept = async (req, res) => {
    if(!req.body._id)
        throw new Error("Dept id not provided");

    const id = req.body._id;
    const updatedDept = await Dept.findByIdAndUpdate(id, req.body, {new: true});

    if(!updatedDept)
        throw new Error("Dept doesn't exist");

    res.status(200).send(updatedDept);
}

const deleteDept = async (req, res) => { 
    if(!req.body._id)
        throw new Error("Dept id not provided");
    
    const id = req.body._id;
    const dept = await Dept.deleteOne({_id: id});

    if(!dept)
        throw new Error("Dept doesn't exist");

    res.status(200).send(dept);
}


module.exports = {
    createDept,
    fetchDepts,
    editDept,
    deleteDept
}