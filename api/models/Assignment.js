const mongoose = require("mongoose");

// Ödev Schema
const assignmentSchema = new mongoose.Schema({
    title: String,
    description: String,
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }]
    
});
const Assignment = mongoose.model("Assignment", assignmentSchema);
module.exports = Assignment;
