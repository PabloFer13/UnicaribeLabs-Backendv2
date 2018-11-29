const models = require('../../sequelize/models');
/** 28 Nov 2018 */
// models.laboratories.findAll()
  // .then( res => console.log(JSON.stringify(res, null, 2)))
  // .catch( err => console.log(err) );
  
/** 28 Nov 2018 */
models.laboratories.findAll({
  include: [
    { model: models.users },
    { model: models.statuses }
  ]
})
  .then( res => console.log(JSON.stringify(res, null, 2)))
  .catch( err => console.log(err) );