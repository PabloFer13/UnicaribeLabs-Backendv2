const models = require('../../sequelize/models');
/** 25 Nov 2018 */
// models.usertypes.findAll({
//   include: [
//     { model: models.statuses }
//   ]
// })
//   .then( res => console.log(JSON.stringify(res, null, 2)))
//   .catch( err => console.log(err) );


models.usertypes.update(
    { type: 'Administrador' },
    { where: { id: 1 } }
  )
  .then(res =>  { console.log(res); })
  .catch(err => { console.log(err); });
