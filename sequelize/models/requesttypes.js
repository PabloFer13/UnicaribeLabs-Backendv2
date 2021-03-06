/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const requesttypes = sequelize.define('requesttypes', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    color: {
      type: DataTypes.STRING(7),
      allowNull: false,
      unique: true
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
    tableName: 'requesttypes'
  });

  requesttypes.associate = (models) =>{
    // associations can be defined here
    models.statuses.hasMany(models.requesttypes,   { foreignKey: "status_id" });
    
    models.requests.belongsTo(models.requesttypes, { foreignKey: "requestType_id" });
  };

  return requesttypes;
};
