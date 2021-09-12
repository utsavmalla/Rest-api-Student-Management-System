import { DataTypes, Model, Optional } from "sequelize";
import db from "../../config/database";
// import Student_Subjects from "../../student_subjects/model";
// import Subject from "../../subjects/model";

interface StudentAttributes {
    id: number;
    guid: string;
    firstname: string;
    lastname: string;
    created: string;
    deleted: string;
}

interface StudentCreationAttributes
    extends Optional<StudentAttributes, 'id'> { }

interface StudentInstance
    extends Model<StudentAttributes, StudentCreationAttributes>,
    StudentAttributes { }

const Student = db.define<StudentInstance>(
    'students', {
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
    firstname: {
        type: DataTypes.STRING(100),
        allowNull: false

    },
    lastname: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW

    },
    deleted: {
        type: DataTypes.DATE,

    },
}, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'modified'


});

// Student.belongsToMany(Subject, {
//     through: Student_Subjects,
//     foreignKey: 'student_id',
//     as: 'student'
// });

export default Student;

// export class StudentInstance extends Model<StudentAttributes> { }

// StudentInstance.init({
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
//     firstname: {
//         type: DataTypes.STRING(100),
//         allowNull: false

//     },
//     lastname: {
//         type: DataTypes.STRING(100),
//         allowNull: false
//     },
//     created: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW

//     },
//     deleted:{
//         type: DataTypes.DATE,

//     }
// },{
//         sequelize: db,
//         tableName: "students",
//         timestamps: true,
//         createdAt: 'created',
//         updatedAt: 'modified'
//     });