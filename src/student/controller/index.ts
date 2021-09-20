import { query, request, Request, Response } from "express";
import { Sequelize } from "sequelize";
import { singularize } from "sequelize/types/lib/utils";
import { v4 as UUIDV4 } from 'uuid';
import Subject from "../../subjects/model";
import Student from "../model";
// import { StudentInstance } from "../model";


// interface Props {
//     page: number;
//     pageSize: number;

// }

class StudentController {

    //-view all students
    async view(req: Request, res: Response) {
        try {

            let { pageSize, page} = req.query;
            const orderBy = req.query.orderBy as string ;
            const orderDir = req.query.orderDir as string ;
            let realPage:number;
            let realTake:number;
            

            if(pageSize) realTake = +pageSize
            else{
                pageSize = '10';
                realTake = 10;
            }

            if (page) realPage = +page === 1 ? 0 : (+page - 1) * realTake;
            else {
              realPage = 0;
              page = '1';
            }

            



            const record = await Student.findAll(
                {
                    where: { deleted: null },
                    order: [
                        [orderBy, orderDir]
                    ],
                    limit: realTake,
                    offset: realPage,
                },

            );
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
                    attributes: ['guid', 'name', 'code'],
                    through: {
                        where: { deleted: null },
                        attributes: []
                    }

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
        try {
            const ids = req.body.guid;
            const guid = UUIDV4();

            if (ids) {
                const [updated] = await Student.update(req.body, { where: { guid: ids } });
                if (updated) {
                    const updatedPost = await Student.findOne({ where: { guid: ids } });
                    return res.json({ updatedPost, msg: 'Successfuly updated student' });
                }
                throw new Error('Post not found');

            } else {
                const record = await Student.create({ ...req.body, guid: guid });
                return res.json({ record, msg: 'Successfuly created student' })


            }



        } catch (e) {
            console.log(e)

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