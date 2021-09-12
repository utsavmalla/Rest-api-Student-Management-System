import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { v4 as UUIDV4 } from 'uuid';
import Subject from "../../subjects/model";
import Student from "../model";
// import { StudentInstance } from "../model";


class StudentController {
    //-view all students
    async view(req: Request, res: Response) {
        try {
            const record = await Student.findAll({ where: { deleted: null } });
            return res.json(record)
        } catch (error) {
            // return res.json({msg:'fail to send', status: 500, route:'/students'})
            console.error(error)
        }
    }

    //-view student by id
    async viewById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const record = await Student.findOne({
                where: { guid: id },
                include: [{
                    model: Subject,
                    attributes: ['id', 'code', 'name']
                }]
            });
            // const record = await StudentInstance.findOne({where: {guid: id} });
            return res.json(record);
        } catch (error) {
            // return res.json({msg: 'fail to read', status: 500, route: '/student/:id'})
            console.error(error)

        }
    }



    //-create Students
    async create(req: Request, res: Response) {
         ///--------update student if exist or create student if not   ///////
        // const guid = UUIDV4
        // try {
        //     const { body } = req
        //     const record = await Student.findOne({
        //         where: { guid: body.guid }
        //     })
        //     console.log("1done")

        //     if (record) {
        //         const updatestd = await Student.update(req.body, { where: { guid: body.guid } });
        //          return res.json({ updatestd, msg: 'Student Updated' })
                

        //     }

        //     else{
        //          const createdstd = await Student.create({ ...req.body, guid});
        //         return res.json({ createdstd, msg: 'Student Created' })

        //     }
           

            
        // } catch (error) {
        //     console.error(error)
        // }

        /////////----create student only---/////////////////////
        const guid = UUIDV4();
        try {
            const record = await Student.create({ ...req.body, guid });
            // const record = await StudentInstance.create({ ...req.body, guid});
            return res.json({ record, msg: 'Successfuly Created Student' })
        } catch (error) {
            return res.json({ msg: 'fail to create', status: 500, route: '/students' })
            // console.error(error)
        }
    }


    //-delete Student records-------///////////
    //adds timestamp to deleted coloumn for delection 
    async delete(req: Request, res: Response) {

        try {
            const { id } = req.params;
            const [deleted] = await Student.update({ deleted: Sequelize.fn('now') }, {
                // const [deleted] = await StudentInstance.update({deleted: Sequelize.fn('now')}, { 
                where: { guid: id }
            });
            if (deleted) {
                const deletedPost = await Student.findOne({ where: { guid: id } }); //for test only
                // const deletedPost = await StudentInstance.findOne({ where: { guid: id } }); //for test only
                return res.json({ deletedPost, msg: 'Successfuly deleted student' });
            }
            throw new Error('Post not found');

        } catch (error) {
            return res.json({ msg: 'fail to delete', status: 500, route: '/student/:id' })
            // console.error(error)
        }

    }





}

export default new StudentController;