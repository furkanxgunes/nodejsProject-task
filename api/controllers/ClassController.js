const Class = require("../models/Class");
const Student = require("../models/Student");

exports.addClass = async (req, res, next) => {
  try {
    let addedData = await Class.create(req.body);
    res
      .status(200)
      .send(
        `${addedData._id} ID ile ${addedData.name} isimli sınıf oluşturuldu. \n ${addedData}`
      );
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(403).json("You are not authorized");
  }
};
exports.getClassWithStudentsAndAssignments = async (req, res) => {
  try {
    const filter = req.params.id!=undefined?{
      _id:req.params.id
    }:null;
    const classes = await Class.find(filter).populate({
      path: "students",
      select: "name age assignments",
      model: Student,
      populate: {
        path: "assignments",
        select: "title description",
        model: "Assignment",
      },
    });
    return res.status(200).send(classes);
  } catch (error) {
    console.log(error.message);
    return res.status(403).json("You are not authorized");
  }
};
