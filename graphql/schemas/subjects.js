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
      statusSchema  = require('./statuses');

module.exports = new GraphQLObjectType({
  name: 'Subject',
  description: '',
  fields () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: '',
        resolve(subjec) {
          return subjec.id;
        }
      },
      enrollment: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(subjec) {
          return subjec.enrollment;
        }
      },
      name: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(subjec) {
          return subjec.name;
        }
      },
      status: {
        type: new GraphQLNonNull(statusSchema),
        description: '',
        resolve (subjec) {
          return models.statuses.findById(subjec.status_id);
        }
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(subjec) {
          return new Date(subjec.createdAt).toString();
        }
      },
      updatedAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(subjec) {
          return new Date(subjec.updatedAt).toString();
        }
      }
    };
  }
});