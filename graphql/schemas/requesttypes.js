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
      statusSchema = require('./statuses');

module.exports = new GraphQLObjectType({
  name: 'RequestType',
  description: '',
  fields () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: '',
        resolve(requesttype) {
          return requesttype.id;
        }
      },
      type: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(requesttype){
          return requesttype.type;
        }
      },
      color: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(requesttype){
          return requesttype.color;
        }
      },
      status: {
        type: new GraphQLNonNull(statusSchema),
        description: '',
        resolve (requesttype) {
          return models.statuses.findByPk(requesttype.status_id);
        }
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(requesttype) {
          return new Date(requesttype.createdAt).toString();
        }
      },
      updatedAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(requesttype) {
          return new Date(requesttype.updatedAt).toString();
        }
      }
    };
  }
});