const models = require('../../sequelize/models');
/** 25 Nov 2018 */
models.requests.findAll({
  include: [
    { model: models.users },
    // { model: models.statuses }
  ]
})
  .then( res => console.log(JSON.stringify(res, null, 2)))
  .catch( err => console.log(err) );