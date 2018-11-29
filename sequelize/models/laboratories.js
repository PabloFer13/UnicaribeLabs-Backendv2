/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const laboratories = sequelize.define('laboratories', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    short_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    building: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'laboratories'
  });

  laboratories.associate = (models) =>{
    // associations can be defined here
    models.users.hasMany(models.laboratories, { foreignKey: "user_id" });
    models.statuses.hasMany(models.laboratories, { foreignKey: "status_id" });
    
    models.requests.belongsTo(models.laboratories, { foreignKey: "laboratory_id" });
  };

  return laboratories;

};
