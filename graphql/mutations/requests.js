const moment = require('moment');
const {
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} = require('graphql');
const bcrypt = require('bcryptjs');

const models     = require('../../sequelize/models'),
      requestSchema = require('../schemas/requests');

const statusScalar   = require('../scalars/statusScalar'),
      dayScalar      = require('../scalars/daysScalar'),
      usertypeScalar = require('../scalars/usertypeScalar');

module.exports = {
  create_request: {
    type: requestSchema,
    description: 'Crea una solicitud.',
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
      subjectSemesterId: { type: new GraphQLNonNull(GraphQLID) },
      requestTypeId: { type: new GraphQLNonNull(GraphQLID) },
      laboratoryId: { type: new GraphQLNonNull(GraphQLID) },
      startDate: { type: GraphQLString },
      endDate: { type: GraphQLString },
      startTime: { type: new GraphQLNonNull(GraphQLString) },
      endTime: { type: new GraphQLNonNull(GraphQLString) },
      dia: { type: new GraphQLNonNull(dayScalar) }
    },
    async resolve(root, args){
      const {
        userId: user_id,
        subjectSemesterId: subjectSemester_id,
        requestTypeId: requestType_id,
        laboratoryId: laboratory_id,
        startTime: start_time,
        endTime: end_time,
        dia
      } = args;

      let { startDate: start_date, endDate: end_date } = args;
      const user = await models.users.findByPk(user_id);
      const userType = await models.usertypes.findByPk(user.userType_id);
      
      if(requestType_id === 1){
        const { semester } = await models.subjectssemester.findById(subjectSemesterId, { include: { semester } });
        start_date = semester.start_date || start_date;
        end_date = semester.end_date || end_date;
        if(userType.id !== usertypeScalar.getValue('Becario') &&
        userType.id !== usertypeScalar.getValue('Administrador')){
          throw new Error('Not enough access rights');
        }
      }


      const requestCreated = await models.requests.create({
        user_id,
        subjectSemester_id,
        requestType_id,
        laboratory_id,
        start_time,
        end_time,
        start_date: moment(start_date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        end_date: moment(end_date, 'DD/MM/YYYY').format('YYYY-DD-MM'),
        dia,
        status_id: statusScalar.getValue('Pendiente').value
      });

      const request = await models.requests.findByPk(requestCreated.id, {
        include: [
          { model: models.laboratories },
          { model: models.requesttypes },
          { model: models.users },
          { model: models.statuses }
        ]
      });

      return request;

    }
  }
}