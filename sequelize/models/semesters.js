/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const semester = sequelize.define('semesters', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    semester: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
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
    tableName: 'semesters'
  });

  semester.associate = (models) =>{
    // associations can be defined here
    models.statuses.hasMany(models.semesters, { foreignKey: "status_id" });
    
    models.subjectssemester.belongsTo(models.semesters, { foreignKey: "semester_id" });
  };

  return semester;
};
