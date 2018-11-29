/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const requests = sequelize.define('requests', {
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
    laboratory_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'laboratories',
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

  requests.associate = (models) =>{
    // associations can be defined here
    models.users.hasMany(models.requests, { foreignKey: "user_id" });
    models.subjectssemester.hasMany(models.requests, { foreignKey: "subjectSemester_id" });
    models.requesttypes.hasMany(models.requests, { foreignKey: "requestType_id" });
    models.laboratories.hasMany(models.requests, { foreignKey: "laboratory_id" });
    models.statuses.hasMany(models.requests, { foreignKey: "status_id" });
    
    models.reservations.belongsTo(models.requests,  { foreignKey: "request_id" });
  };
  
  return requests;
};
