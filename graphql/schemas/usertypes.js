const {
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,

  GraphQLNonNull,
  GraphQLObjectType,
} = require('graphql');

const models = require ('../../sequelize/models/index'),
      statusSchema = require('./statuses');

module.exports = new GraphQLObjectType({
  name: 'UserType',
  description: '',
  fields () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: '',
        resolve(usertype) {
          return usertype.id;
        }
      },
      type: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(usertype) {
          return usertype.type;
        }
      },
      permissions: {
        type: GraphQLString,
        description: '',
        resolve(usertype) {
          return usertype.permissions;
        }
      },
      status: {
        type: new GraphQLNonNull(statusSchema),
        description: '',
        resolve (usertype) {
          return models.statuses.findById(usertype.status_id);
        }
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(usertype) {
          return new Date(usertype.createdAt).toString();
        }
      },
      updatedAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(usertype) {
          return new Date(usertype.updatedAt).toString();
        }
      }
    };
  }
});