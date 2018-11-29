/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const subjectssemester = sequelize.define('subjectssemester', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    section: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1',
      references: {
        model: 'statuses',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    subject_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'subjects',
        key: 'id'
      }
    },
    semester_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'semesters',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'subjectssemester'
  });

  subjectssemester.associate = (models) =>{
    // associations can be defined here
    models.statuses.hasMany(models.subjectssemester, { foreignKey: "status_id" });
    models.users.hasMany(models.subjectssemester, { foreignKey: "user_id" });
    models.subjects.hasMany(models.subjectssemester, { foreignKey: "subject_id" });
    models.semesters.hasMany(models.subjectssemester, { foreignKey: "semester_id" });
    
    models.requests.belongsTo(models.subjectssemester, { foreignKey: "subjectSemester_id" });
  };

  return subjectssemester;
};
