const models = require('../../sequelize/models');
/** 25 Nov 2018 */
models.statuses.findAll()
  .then( res => console.log(JSON.stringify(res, null, 2)))
  .catch( err => console.log(err) );