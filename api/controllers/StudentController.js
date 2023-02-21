const Student = require("../models/Student");
const Class = require("../models/Class");
const Assignment = require("../models/Assignment");

exports.addStudent = async (req, res, next) => {
  try {
    let addedData = await Student.create(req.body);
    console.log("req.body.length");
    console.log(req.body);
    for (let index = 0; index < req.body.length; index++) {
      console.log("element");
      console.log(element);
  
      const element = addedData[index];
      await Class.findByIdAndUpdate(
        element.class,
        {$push: {students: element._id }} ,
      );
    }
    return res.status(200).json(addedData);
  } catch (error) {
    console.log(error.message);
    return res.status(403).json("You are not authorized");
  }
};

exports.getStudentsWithAssignments = async (req, res) => {
  try {
    const filter = req.params.id!=undefined?{
      _id:req.params.id
    }:null;
    const students = await Student.find(filter)
      .populate({
        path: "assignments",
        select: "title description",
        model: Assignment,
      })
      .populate({ path: "class", select: "name", model: Class });
    return res.status(200).send(students);
  } catch (error) {
    console.log(error.message);
    return res.status(403).json("You are not authorized");
  }
};
