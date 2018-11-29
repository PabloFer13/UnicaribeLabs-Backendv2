/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const reservations = sequelize.define('reservations', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    request_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'requests',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATEONLY,
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'reservations'
  });

  reservations.associate = (models) =>{
    // associations can be defined here
    models.requests.hasMany(models.reservations, { foreignKey: "request_id" });
    models.statuses.hasMany(models.reservations, { foreignKey: "status_id" });
  };
  return reservations;
};
