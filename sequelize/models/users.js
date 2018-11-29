/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    url_pp: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    userType_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'usertypes',
        key: 'id'
      }
    },
    status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'statuses',
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
    tableName: 'users'
  });

  users.associate = (models) =>{
    // associations can be defined here
    models.statuses.hasMany(models.users, { foreignKey: "status_id" } );
    models.usertypes.hasMany(models.users, { foreignKey: "userType_id" } );
    
    models.laboratories.belongsTo(models.users, { foreignKey: "user_id" } );
    models.requests.belongsTo(models.users, { foreignKey: "user_id" } );
    models.subjectssemester.belongsTo(models.users, { foreignKey: "user_id" } );
  };

  return users;
};
