/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subjectssemester', {
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
};
