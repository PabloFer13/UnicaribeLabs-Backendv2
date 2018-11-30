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
      userSchema     = require('./users'),
      subjectSchema  = require('./subjects'),
      semesterSchema = require('./semesters');

module.exports = new GraphQLObjectType({
  name: 'SubjectForSemerter',
  description: '',
  fields () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: '',
        resolve(subjectsemester) {
          return subjectsemester.id;
        }
      },
      section: {
        type: new GraphQLNonNull(GraphQLInt),
        description: '',
        resolve(subjectsemester) {
          return subjectsemester.section;
        }
      },
      status: {
        type: new GraphQLNonNull(statusSchema),
        description: '',
        resolve (subjec) {
          return models.statuses.findById(subjec.status_id);
        }
      },
      teacher: {
        type: new GraphQLNonNull(userSchema),
        description: '',
        resolve (subjectsemester) {
          return models.users.findById(subjectsemester.user_id,{ attributes: { exclude: ['password'] }});
        }
      },
      subject: {
        type: new GraphQLNonNull(subjectSchema),
        description: '',
        resolve (subjectsemester) {
          return models.subjects.findById(subjectsemester.subject_id);
        }
      },
      semester: {
        type: new GraphQLNonNull(semesterSchema),
        description: '',
        resolve (subjectsemester) {
          return models.semesters.findById(subjectsemester.semester_id);
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