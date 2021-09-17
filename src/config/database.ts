import {Sequelize} from 'sequelize';
import Student from '../student/model';
import Student_Subjects from '../student_subjects/model';
import Subject from '../subjects/model';

// import { StudentInstance } from '../student/model';
// import { Student_SubjectsInstance } from '../student_subjects/model';
// import { SubjectInstance } from '../subjects/model';

// const sequelize = new Sequelize('database', 'username', 'password',
const db = new Sequelize('StudentManagementDB','postgres', 'tesadmin',{
    host: 'localhost',
    dialect:'postgres',
    // logging: false,
});



export default db

// // association many to many
// StudentInstance.belongsToMany(SubjectInstance,{
//     through: Student_SubjectsInstance,
//     as: "subjects",
//     foreignKey: "subject_id",
// })

// SubjectInstance.belongsToMany(StudentInstance,{
//     through: Student_SubjectsInstance,
//     as: "students",
//     foreignKey: "student_id",
// })