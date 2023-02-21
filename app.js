const express = require("express");
const mongoose = require("mongoose");

const ClassController = require("./api/controllers/ClassController");
const StudentController = require("./api/controllers/StudentController");
const AssignmentController = require("./api/controllers/AssignmentController");

const app = express();
const port = 8000;

//connect DB
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/school-test");

//MIDDLEWARE
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.get("/", (req, res) => {
  res.send("Hello Worrld2s!");
});

//CREATE
app.post("/api/class/add", ClassController.addClass);
app.post("/api/student/add", StudentController.addStudent);
app.post("/api/assignment/add", AssignmentController.addAssignment);

//SELECT
app.get("/api/class/get/:id?", ClassController.getClassWithStudentsAndAssignments);
app.get("/api/student/get/:id?", StudentController.getStudentsWithAssignments);
app.get("/api/assignment/get/:id?",AssignmentController.getAssignmentsWithStudentsAndClass);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
