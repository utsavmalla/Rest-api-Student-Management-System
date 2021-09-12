import { DataTypes, Model, Optional } from "sequelize";
import db from "../../config/database";
import Student from "../../student/model";
import Subject from "../../subjects/model";
// import  {StudentInstance} from "../../student/model"
// import { SubjectInstance } from "../../subjects/model";


interface Student_SubjectsInstance extends Model {
    id: number;
    guid: string;
    created: string;
    deleted: string;
    student_id: number;
    subject_id: number;
}



const Student_Subjects = db.define<Student_SubjectsInstance>('student_subjects', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    guid: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        unique: true

    },

    created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW

    },
    deleted: {
        type: DataTypes.DATE,

    },
    student_id: {
        type: DataTypes.INTEGER,
        // references:{
        //     model: Student,
        //     key: 'student_id'
        // },

    },
    subject_id: {
        type: DataTypes.INTEGER,
        // references:{
        //     model: Subject,
        //     key: 'subject_id'
        // },

    }
}, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'modified'


});



export default Student_Subjects;

// //111
// interface Student_SubjectsAttributes {
//     id: number;
//     guid: string;
//     created: string;
//     deleted: string;
//     student_id: number;
//     subject_id: number;
// }

// interface Student_SubjectsCreationAttributes extends Optional<Student_SubjectsAttributes, "id"> { }

// interface Student_SubjectsInstance
//     extends Model<Student_SubjectsAttributes, Student_SubjectsCreationAttributes>,
//     Student_SubjectsAttributes { }

// const Student_Subjects = db.define<Student_SubjectsInstance>('student_subjects', {
//     id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     guid: {
//         type: DataTypes.UUIDV4,
//         allowNull: false,
//         unique: true

//     },

//     created: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW

//     },
//     deleted: {
//         type: DataTypes.DATE,

//     },
//     student_id: {
//         type: DataTypes.INTEGER,
//         // references:{
//         //     model: Student,
//         //     key: 'student_id'
//         // },

//     },
//     subject_id: {
//         type: DataTypes.INTEGER,
//         // references:{
//         //     model: Subject,
//         //     key: 'subject_id'
//         // },

//     }
// }, {
//     timestamps: true,
//     createdAt: 'created',
//     updatedAt: 'modified'


// });

// //  Student_Subjects.associate = (models) => {
// //     Subject.belongsToMany(models.Student, {
// //         through: Student_Subjects,
// //         foreignKey: 'subject_id',
// //         as: 'subject'});
// //     Student.belongsToMany(models.Subject, {
// //             through: Student_Subjects,
// //             foreignKey: 'student_id',
// //             as: 'student'})    

// //  }

// export default Student_Subjects;

// //111

// export class Student_SubjectsInstance extends Model<Student_SubjectsAttributes> { }


// Student_SubjectsInstance.init({
//     id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     guid: {
//         type: DataTypes.UUIDV4,
//         allowNull: false,
//         unique: true

//     },

//     created: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW

//     },
//     deleted:{
//         type: DataTypes.DATE,

//     },
//     student_id: {
//         type: DataTypes.INTEGER,
//         references:{
//             model: StudentInstance,
//             key: 'student_id'
//         },

//     },
//     subjects_id: {
//         type: DataTypes.INTEGER,
//         references:{
//             model: SubjectInstance,
//             key: 'subject_id'
//         },

//     }
// },{
//         sequelize: db,
//         tableName: "student_subjects",
//         timestamps: true,
//         createdAt: 'created',
//         updatedAt: 'modified'
//     });




