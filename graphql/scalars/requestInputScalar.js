const {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = require('graphql');

const daysScalar = require('./daysScalar');

module.exports = new GraphQLInputObjectType({
  name: 'requestInputScalar',
  description: '',
  fields () {
    return {
      day        : { type: new GraphQLNonNull(daysScalar) },
      start_time : { type: new GraphQLNonNull(GraphQLString), description: 'hh:mm:ss' },
      end_time   : { type: new GraphQLNonNull(GraphQLString), description: 'hh:mm:ss' },
    };
  }
});
