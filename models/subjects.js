/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subjects', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    enrollment: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.TEXT,
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'subjects'
  });
};
