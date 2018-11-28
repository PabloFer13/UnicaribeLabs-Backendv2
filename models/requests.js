/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('requests', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    subjectSemester_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'subjectssemester',
        key: 'id'
      }
    },
    requestType_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'requesttypes',
        key: 'id'
      }
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dia: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'statuses',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
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
    tableName: 'requests'
  });
};
