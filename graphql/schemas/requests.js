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
      userSchema            = require('./users'),
      subjectsemesterSchema = require('./subjectssemester'),
      requesttypeSchema     = require('./requesttypes'),
      laboratorySchema      = require('./laboratories'),
      statusSchema          = require('./statuses');

module.exports = new GraphQLObjectType({
  name: 'Request',
  description: '',
  fields () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: '',
        resolve(request) {
          return request.id;
        }
      },
      createdBy: {
        type: new GraphQLNonNull(userSchema),
        description: '',
        resolve (request) {
          return models.users.findByPk(request.user_id,{ attributes: { exclude: ['password']} });
        }
      },
      subjectSemester_id: {
        type: new GraphQLNonNull(subjectsemesterSchema),
        description: '',
        resolve (request) {
          return models.subjectssemester.findByPk(request.subjectSemester_id);
        }
      },
      requestType_id: {
        type: new GraphQLNonNull(requesttypeSchema),
        description: '',
        resolve (request) {
          return models.requesttypes.findByPk(request.requestType_id);
        }
      },
      laboratory_id: {
        type: new GraphQLNonNull(laboratorySchema),
        description: '',
        resolve (request) {
          return models.laboratories.findByPk(request.laboratory_id);
        }
      },
      start_date: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(request) {
          return request.start_date;
        }
      },
      end_date: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(request) {
          return request.end_date;
        }
      },
      dia: {
        type: new GraphQLNonNull(GraphQLInt),
        description: '',
        resolve(request) {
          return request.dia;
        }
      },
      start_time: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(request) {
          return request.start_time;
        }
      },
      end_time: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(request) {
          return request.end_time;
        }
      },
      status: {
        type: new GraphQLNonNull(statusSchema),
        description: '',
        resolve (request) {
          return models.statuses.findByPk(request.status_id);
        }
      },
      description: {
        type: GraphQLString,
        description: '',
        resolve(request) {
          return request.description;
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