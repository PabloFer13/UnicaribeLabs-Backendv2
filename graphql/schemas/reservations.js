const {
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,

  GraphQLNonNull,
  GraphQLObjectType,
} = require('graphql');

const models  = require ('../../sequelize/models/index'),
      statusSchema  = require('./statuses'),
      requestSchema = require('./requests');

module.exports = new GraphQLObjectType({
  name: 'Reservation',
  description: '',
  fields () {
    return {
      id: { 
        type: new GraphQLNonNull(GraphQLID),
        description: '',
        resolve(schedule) {
          return schedule.id;
        }
      },
      request_id: {
        type: new GraphQLNonNull(requestSchema),
        description: '',
        resolve(reservation){
          return models.requests.findByPk(reservation.request_id);
        }
      },
      date: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(reservation) {
          return new Date(reservation.date).toString();
        }
      },
      status: {
        type: new GraphQLNonNull(statusSchema),
        description: '',
        resolve (reservation) {
          return models.statuses.findByPk(reservation.status_id);
        }
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(reservation) {
          return new Date(reservation.createdAt).toString();
        }
      },
      updatedAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(reservation) {
          return new Date(reservation.updatedAt).toString();
        }
      }
      
    };
  }
});