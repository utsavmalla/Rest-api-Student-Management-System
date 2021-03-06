import { Request, Response } from "express";
import { Op, Sequelize } from "sequelize";
import { v4 as UUIDV4 } from 'uuid';
import Student from "../../student/model";
import Subject from "../../subjects/model";
import Student_Subjects from "../model";
// import { StudentInstance } from "../../student/model";
// import { SubjectInstance } from "../../subjects/model";


class Student_SubjectsController {

    async addsubject(req: Request, res: Response) {

        try {
            //find id of students for id params(guid)
            Student
                .findOne({
                    attributes: ['id'], where: { guid: req.params.id },
                    include: [{
                        model: Subject,
                        as: 'subjects'
                    }]
                })
                .then(async (std) => {

                    const { subject_ids } = req.body

                    //throw errow if student id is not passed        
                    if (!std) {
                        return res.status(404).send({
                            message: 'Student Not Found',
                        });

                    }


                    //Set null deleted coloumn in student table if subjects:['ids'] are not passed body.        
                    if (!subject_ids) {
                        const deleted = await Student_Subjects.update({ deleted: Sequelize.fn('now') }, { where: { student_id: std.id } })
                        console.log("if prinf")

                        return res.json({
                            message: 'Subject Is Deleted from student',
                        });



                    } else {

                        let subjectsCollection= [] as number[];

                        //Loop subjects_ids(guids) array from req.body to get subject id    
                        subject_ids.forEach((subIds: any) => {

                            //finding id of subjects_ids
                            Subject
                                .findOne({ attributes: ['id'], where: { guid: subIds } })
                                .then(async (sub) => {
                                    const guid = UUIDV4();

                                    //find subjects_id and student_id exist or not
                                    if (sub) {

                                        const findmatch = await Student_Subjects.findOne({
                                            where: {
                                                [Op.and]: [{ student_id: std.id, subject_id: sub.id }]
                                            }
                                        });
                                        //add subjects id and student id to student_subjects table for realation
                                        if (findmatch == null) {
                                            // console.log(sub, std)
                                            // console.log("test")
                                            const record = await Student_Subjects.create({ student_id: std.id, subject_id: sub.id, guid })
                                            
                                            //addiing subject id to subjectsCollections
                                            
                                            subjectsCollection.push(sub.id)
                                            
                                            return res.json({ record, msg: 'stubject added to student' })


                                        }



                                        //if all the value pass in subjects_ids in req.body exits sent this msg
                                        else {
                                            return res.json({ msg: 'subjects already exist' })

                                        }

                                    }

                                }).catch(function (err) {
                                    res.json(err.message)
                                })


                        })

                        

                        //adding null value to the student cols if subjects_ids is not passed in the body.

                        const updated = await Student_Subjects.update({ deleted: Sequelize.fn('now') }, {
                                        where: {
                                            [Op.and]: [{ student_id: std.id }, { subjects_id: { [Op.notIn]: subjectsCollection } }
                                            ]
                                        }
                                    })
                                    return res.json({ updated })




                        // console.log(subjectsCollection);
                        // if (subjectsCollection) {
                        //     subjectsCollection.forEach(async (subCols: any) => {
                        //         const updated = await Student_Subjects.update({ deleted: Sequelize.fn('now') }, {
                        //             where: {
                        //                 [Op.and]: [{ student_id: std.id }, { subjects_id: { [Op.notIn]: subCols } }
                        //                 ]
                        //             }
                        //         })
                        //         return res.json({ updated })


                        //     })

                        // }


                    }

                })

        } catch (error) {
            console.log(error)

        }
    }

    //---- add subject to student from id params and req body
    // async addsubject(req: Request, res: Response) {

    //     try {
    //         Student
    //             .findOne({
    //                 attributes: ['id'], where: { guid: req.params.id },
    //                 include: [{
    //                     model: Subject,
    //                     as: 'subjects'
    //                 }]
    //             })
    //             .then(async (std) => {

    //                 const {subject_ids} = req.body


    //                 if (!std) {
    //                     return res.status(404).send({
    //                         message: 'Student Not Found',
    //                     });

    //                 }

    //                 if(!subject_ids) {
    //                     const deleted = await Student_Subjects.update({ deleted: Sequelize.fn('now') }, { where: { student_id: std.id } })
    //                     console.log("if prinf")

    //                     return res.json({
    //                         message: 'Subject Is Deleted from student',
    //                     });

    //                 } else {
    //                     Subject
    //                         .findOne({ attributes: ['id'], where: { guid: subject_ids } })
    //                         .then(async (sub) => {
    //                             const guid = UUIDV4();
    //                             // if (!sub) {

    //                             // }

    //                             if (sub) {
    //                                 console.log(sub, std)
    //                                 console.log("test")
    //                                 const record = await Student_Subjects.create({ student_id: std.id, subject_id: sub.id, guid })
    //                                 return res.json({ record, msg: 'stubject added to student' })


    //                             }

    //                         })

    //                 }

    //             })

    //     } catch (error) {
    //         console.log(error)

    //     }
    // }


    ///-----view all students with subjects 
    // async view(req: Request, res: Response) {
    //     try {
    //         const record = await Student.findAll({
    //             where: { deleted: null },
    //             include: [{
    //                 model: Subject,
    //                 attributes: ['id', 'code', 'name']
    //                 // as: 'subjects'

    //             }]
    //         });
    //         return res.json(record)
    //     } catch (error) {
    //         // return res.json({msg:'fail to send', status: 500, route:'/students'})
    //         console.log(error)
    //     }
    // }

    //////------////////////

    //     try{
    //         const {id} = req.params;
    //         const {subject_id} = req.body
    //         const studentid: number  = await Student.findOne({ attributes: ['id'], where: {guid: id}}
    //         ).then()

    //         const subjectid: number = await Subject.findOne({ attributes: ['id'], where: {guid: subject_id}}
    //         ).then()

    //         if(studentid === null) {

    //             return res.json({msg: 'student or subject not found'})
    //         }

    //         if(studentid) {
    //             const record  = await Student_Subjects.create({student_id: studentid , subject_id: subjectid });
    //             return res.json(record)
    //         }

    //     }catch (error){
    //         console.log(error);
    //         }

    //     }
    // }


    ////-------------------///////


}

export default new Student_SubjectsController;