/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const usertypes = sequelize.define('usertypes', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    permissions: {
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
    tableName: 'usertypes'
  });

  usertypes.associate = (models) =>{
    // associations can be defined here
    models.statuses.hasMany(models.usertypes, { foreignKey: "status_id" });
    
    models.users.belongsTo(models.usertypes, { foreignKey: "userType_id" });
  };

  return usertypes;
};
