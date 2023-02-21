const Assignment = require("../models/Assignment");
const Student = require("../models/Student");

exports.addAssignment = async (req, res, next) => {
  try {
    const addedData = await Assignment.create(req.body);
    await Student.updateMany(
      { _id: { $in: addedData.students } },
      { $push: { assignments: addedData._id } },
      { multi: true }
    );
    res
      .status(200)
      .send(
        addedData
      );
  } catch (error) {
    console.log(error.message);
    return res.status(403).json("You are not authorized");
  }
};

exports.getAssignmentsWithStudentsAndClass = async (req, res) => {
  try {
    const filter = req.params.id!=undefined?{
      _id:req.params.id
    }:null;
    const assignments = await Assignment.find(filter).populate({
      path: "students",
      select: "name age class",
      model: Student,
      populate: {
        path: "class",
        model: "Class",
        select: "name",
      },
    });  

    return res.status(200).send(assignments);
  } catch (error) {
    console.log(error.message);
    return res.status(403).json("You are not authorized");
  }
};
 