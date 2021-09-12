import express from "express";

import StudentController from '../controller'

const router = express.Router();

// view all students
router.get('/students',
StudentController.view
)

//view student by id
router.get('/students/:id',
StudentController.viewById
)

//add student
router.post('/students',
StudentController.create
)

//Delete student by id
router.delete('/students/:id',
StudentController.delete

)

 export default router;