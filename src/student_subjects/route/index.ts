import express from "express";

import Student_SubjectsController from '../controller'
import Student_Subjects from "../model";
// import { Student_SubjectsInstance } from "../model";

const router = express.Router();

//view all subjects and student
// router.get('/allinfo',
// Student_SubjectsController.view
// )



//update sudject in students //test get
router.put('/students/:id/subjects',
Student_SubjectsController.addsubject
)

//update student marks on student_subject
router.patch('/students/:id/subjects',
Student_SubjectsController.addmark
)

 export default router;