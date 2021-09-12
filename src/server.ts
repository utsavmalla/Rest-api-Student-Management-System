import express from "express"; 
import db from "./config/database";
import studentRouter from "./student/route"
import subjectRouter from "./subjects/route"
import student_subjects from "./student_subjects/route"
import Student from "./student/model";
import Subject from "./subjects/model";
import Student_Subjects from "./student_subjects/model";

db.authenticate().then(async () => {
   console.log("Database Connected")
}).catch((e: any) => {
   console.log(e.message)
})

Student.belongsToMany(Subject, {
   through: Student_Subjects,
   foreignKey: 'student_id',
   // as: 'student'
});

Subject.belongsToMany(Student, {
   through: Student_Subjects,
   foreignKey: 'subject_id',
   // as: 'subject'
});

const app = express(); // initialize the express server
const port = 3000;

app.use(express.json());

app.use(studentRouter,subjectRouter,student_subjects)

app.listen(port, ()=> {
   console.log(`Connected successfully on port ${port}`)

})