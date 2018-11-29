const models = require('../../sequelize/models');
/** 25 Nov 2018 */
models.subjectssemester.findAll({
  include: [
    { model: models.users,
      include: [{ model: models.usertypes }]
    },
    { model: models.statuses },
    { model: models.subjects },
    { model: models.semesters }
  ]
})
  .then( res => console.log(JSON.stringify(res, null, 2)))
  .catch( err => console.log(err) );