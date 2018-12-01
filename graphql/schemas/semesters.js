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
  name: 'Semester',
  description: '',
  fields () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: '',
        resolve(semester) {
          return semester.id;
        }
      },
      semester: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(semester) {
          return semester.semester;
        }
      },
      start_date: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(semester) {
          return semester.start_date;
        }
      },
      end_date: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(semester) {
          return semester.end_date;
        }
      },
      status: {
        type: new GraphQLNonNull(statusSchema),
        description: '',
        resolve (semester) {
          return models.statuses.findByPk(semester.status_id);
        }
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(semester) {
          return new Date(semester.createdAt).toString();
        }
      },
      updatedAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(semester) {
          return new Date(semester.updatedAt).toString();
        }
      }
    };
  }
});