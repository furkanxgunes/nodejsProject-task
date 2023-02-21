const mongoose = require("mongoose");


// Sınıf Schema
const classSchema = new mongoose.Schema({
    name: String,
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }]
});
const Class = mongoose.model("Class", classSchema);
module.exports = Class;
