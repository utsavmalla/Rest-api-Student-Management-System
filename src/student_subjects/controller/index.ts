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
            Student
                .findOne({
                    attributes: ['id'], where: { guid: req.params.id },
                    include: [{
                        model: Subject,
                        as: 'subjects'
                    }]
                })
                .then(async (std) => {

                    const {subject_ids} = req.body


                    if (!std) {
                        return res.status(404).send({
                            message: 'Student Not Found',
                        });

                    }

                    if(!subject_ids) {
                        const deleted = await Student_Subjects.update({ deleted: Sequelize.fn('now') }, { where: { student_id: std.id } })
                        console.log("if prinf")

                        return res.json({
                            message: 'Subject Is Deleted from student',
                        });

                    } else {

                        subject_ids.forEach((subIds: any) =>{

                         
                                Subject
                                .findOne({ attributes: ['id'], where: { guid: subIds } })
                                .then(async (sub) => {
                                    const guid = UUIDV4();
    
                                    if (sub) {

                                        const findmatch = await Student_Subjects.findOne({where:{
                                            [Op.and]:[ {student_id: std.id,subject_id: sub.id }]
                                        }
                                        });
                                        if(findmatch == null){
                                            console.log(sub, std)
                                            console.log("test")
                                            const record = await Student_Subjects.create({ student_id: std.id, subject_id: sub.id, guid })
                                            return res.json({ record, msg: 'stubject added to student' })

                                        }else{
                                            return res.json({ msg: 'subjects already exist' })

                                        }
                                        
                                       
    
    
                                    }
    
                                }).catch(function(err){
                                    res.json(err.message)
                                })

                            
                        })
                      

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