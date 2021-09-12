import { DataTypes, Model, Optional } from "sequelize";
import db from "../../config/database";
// import Student from "../../student/model";
// import Student_Subjects from "../../student_subjects/model";

interface SubjectAttributes {
  id: number;
  guid: string;
  code: string;
  name: string;
  created: string;
  deleted: string;
}

interface SubjectCreationAttributes extends Optional<SubjectAttributes, "id"> { }

interface StudentInstance
  extends Model<SubjectAttributes, SubjectCreationAttributes>,
  SubjectAttributes { }

const Subject = db.define<StudentInstance>('subjects', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  guid: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
  },
  code: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  created: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  deleted: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: true,
  createdAt: 'created',
  updatedAt: 'modified'


});

// Subject.belongsToMany(Student, {
//     through: Student_Subjects,
//     foreignKey: 'subject_id',
//     as: 'subject'
// });


export default Subject;

// export class SubjectInstance extends Model<SubjectAttributes> { }

// SubjectInstance.init({
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
//     code: {
//         type: DataTypes.STRING(100),
//         allowNull: false

//     },
//     name: {
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
//         tableName: "subjects",
//         timestamps: true,
//         createdAt: 'created',
//         updatedAt: 'modified'
//     });
