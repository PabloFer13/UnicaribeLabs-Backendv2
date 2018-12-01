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

const moment = require('moment');

const models  = require('../../sequelize/models'),
      reservationSchema = require('../schemas/reservations');

const statusScalar       = require('../scalars/statusScalar'),
      requestInputScalar = require('../scalars/requestInputScalar');

module.exports = {
  create_Reservation: {
    type: new GraphQLList(reservationSchema),
    args: {
      user_id            : { type: new GraphQLNonNull(GraphQLID) },
      subjectSemester_id : { type: new GraphQLNonNull(GraphQLID) },
      requestType_id     : { type: new GraphQLNonNull(GraphQLID) },
      laboratory_id      : { type: new GraphQLNonNull(GraphQLID) },
      week               : { type: new GraphQLNonNull(new GraphQLList(requestInputScalar)) },
      start_date         : { type: new GraphQLNonNull(GraphQLString) },
      end_date           : { type: new GraphQLNonNull(GraphQLString) },
      status             : { type: new GraphQLNonNull(statusScalar) },
      description        : { type: GraphQLString },
    },
    resolve: async(root, args) =>{
      const startdate     = moment(args.start_date).subtract(7, 'day'),
            startdatereal = moment(args.start_date),
            enddate       = moment(args.end_date);
      
      args.week.forEach( async (ele_week) => {
        const transaction = await models.sequelize.transaction();
        try {

          // Nuevo registro en la tabla 'Requests'
          const request = await models.requests.create({
            user_id            : args.user_id,
            subjectSemester_id : args.subjectSemester_id,
            requestType_id     : args.requestType_id,
            laboratory_id      : args.laboratory_id,
            start_date         : args.start_date,
            end_date           : args.end_date,
            dia                : ele_week.day,
            start_time         : ele_week.start_time,
            end_time           : ele_week.end_time,
            status_id          : args.status,
            description        : args.description
          }, {transaction});
          
          let classInRange = []; 
          // Se obtienen las fechas de las clases y se hace la asignacion con la peticion
          const dayOfWeek = ele_week.day;
          let current = startdate.clone();
          while (current.day(7+dayOfWeek).isBefore(enddate)){
            if (current >= startdatereal){
              classInRange.push({
                request_id : request.id,
                date       : current.format('YYYY-MM-DD'),
                status_id  : args.status,
              });
            }
          }
          // Se crean los registros en la tabla reservations
          await models.reservations.bulkCreate(classInRange, {transaction});

          await transaction.commit(); 
        } catch (err) {
          // Rollback transaction if any errors were encountered
          await transaction.rollback();
        }
      });
    }
  },

  
}

