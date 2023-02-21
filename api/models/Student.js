const mongoose = require("mongoose");

// Öğrenci Schema
const studentSchema = new mongoose.Schema({
    name: {type:String, required:true},
    age: Number,
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    },
    assignments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment"
    }]
});
const Student = mongoose.model("Student", studentSchema); 
module.exports = Student;
