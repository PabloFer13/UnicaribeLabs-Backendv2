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
      statusSchema   = require('./statuses'),
      userTypeSchema = require('./usertypes');

module.exports = new GraphQLObjectType({
  name: 'User',
  description: '',
  fields () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: '',
        resolve(user) {
          return user.id;
        }
      },
      first_name: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(user) {
          return user.first_name;
        }
      },
      last_name: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(user) {
          return user.last_name;
        }
      },
      email: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(user) {
          return user.email;
        }
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(user) {
          return (user.password == null) ? 'Error: Hidden.' : user.password;
        }
      },
      url_pp: {
        type: GraphQLString,
        description: '',
        resolve(user){
          return user.url_pp;
        }
      },
      phone_number: {
        type: GraphQLString,
        description: '',
        resolve(user){
          return user.phone_number;
        }
      },
      userType: {
        type: new GraphQLNonNull(userTypeSchema),
        description: '',
        resolve (user) {
          return models.usertypes.findByPk(user.userType_id);
        }
      },
      status: {
        type: new GraphQLNonNull(statusSchema),
        description: '',
        resolve (user) {
          return models.statuses.findByPk(user.status_id);
        }
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(user) {
          return new Date(user.createdAt).toString();
        }
      },
      updatedAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(user) {
          return new Date(user.updatedAt).toString();
        }
      }
    };
  }
});