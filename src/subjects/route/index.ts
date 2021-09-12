import express from "express";

import SubjectController from '../controller'

const router = express.Router();

//view all subjects
router.get('/subjects',
SubjectController.view
)

//view subject detail by id
router.get('/subjects/:id',
SubjectController.viewById
)

//add subject
router.post('/subjects',
SubjectController.create
)

//Delete subject by id
router.delete('/subjects/:id',
SubjectController.delete

)

 export default router;