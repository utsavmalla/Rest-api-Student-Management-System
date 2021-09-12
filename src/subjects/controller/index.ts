import {Request, Response} from "express";
import { Sequelize } from "sequelize";
import {v4 as UUIDV4} from 'uuid';
import Subject from "../model";
// import { SubjectInstance } from "../model";

class SubjectController {
    //-view all subjects
    async view(req: Request, res: Response){
        try{
            const record = await Subject.findAll({where: {deleted: null} });
            return res.json(record)
        }catch(e){
            return res.json({msg:'fail to send', status: 500, route:'/subjects'})
        }
    }

    //-view subject deatils by id
    async viewById(req: Request, res: Response) {
        try{
            const{id}= req.params;
            const record = await Subject.findOne({where: {guid: id} });
            return res.json(record);
        }catch(e) {
            return res.json({msg: 'fail to read', status: 500, route: '/subject/:id'})
            
        }
    }

    //-create subjects
    async create(req: Request, res: Response) {
        const guid = UUIDV4();
        try{
            const record = await Subject.create({ ...req.body, guid});
            return res.json({record, msg: 'Successfuly Created subject'})
        }catch(error){
            return res.json({msg:'fail to create', status:500, route:'/subjects'})
            // console.error(error)
        }
    }


    //-delete subject
    //add timestamp to deleted coloumn
    async delete(req: Request, res: Response){
      
        try {
            const { id } = req.params;
            const [deleted] = await Subject.update({deleted: Sequelize.fn('now')}, { 
                where: { guid: id }  });
            if (deleted) {
                const deletedPost = await Subject.findOne({ where: { guid: id } }); //for test only
                return res.json({ deletedPost, msg: 'Successfuly deleted subject' });
            }
            throw new Error('Post not found');

        } catch (error){
            return res.json({ msg: 'fail to delete', status: 500, route: '/subject/:id' })
            // console.error(error)
        }

    }

 
}

export default new SubjectController;