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
      userSchema   = require('./users'),
      statusSchema = require('./statuses');

module.exports = new GraphQLObjectType({
  name: 'Laboratory',
  description: '',
  fields () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: '',
        resolve(laboratory) {
          return laboratory.id;
        }
      },
      name: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(laboratory) {
          return laboratory.name;
        }
      },
      short_name: {
        type: GraphQLString,
        description: '',
        resolve(laboratory) {
          return laboratory.short_name;
        }
      },
      building: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(laboratory) {
          return laboratory.building;
        }
      },
      manager: {
        type: new GraphQLNonNull(userSchema),
        description: '',
        resolve (laboratory) {
          return models.users.findById(laboratory.user_id,{ attributes: { exclude: ['password']} });
        }
      },
      description: {
        type: GraphQLString,
        description: '',
        resolve(laboratory) {
          return laboratory.description;
        }
      },
      status: {
        type: new GraphQLNonNull(statusSchema),
        description: '',
        resolve (laboratory) {
          return models.statuses.findById(laboratory.status_id);
        }
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(laboratory) {
          return new Date(laboratory.createdAt).toString();
        }
      },
      updatedAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(laboratory) {
          return new Date(laboratory.updatedAt).toString();
        }
      }
    };
  }
});