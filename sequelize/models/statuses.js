/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const statuses = sequelize.define('statuses', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    state: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
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
    tableName: 'statuses'
  });

  statuses.associate = (models) =>{
    // associations can be defined here
    models.usertypes.belongsTo(models.statuses, { foreignKey: "status_id" });
    models.users.belongsTo(models.statuses, { foreignKey: "status_id" });
    models.laboratories.belongsTo(models.statuses, { foreignKey: "status_id" });
    models.requesttypes.belongsTo(models.statuses, { foreignKey: "status_id" });
    models.subjectssemester.belongsTo(models.statuses, { foreignKey: "status_id" });
    models.subjects.belongsTo(models.statuses, { foreignKey: "status_id" });
    models.semesters.belongsTo(models.statuses, { foreignKey: "status_id" });
    models.reservations.belongsTo(models.statuses, { foreignKey: "status_id" });
    models.requests.belongsTo(models.statuses, { foreignKey: "status_id" });
  };

  return statuses;
};
