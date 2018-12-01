const {
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} = require('graphql');

const models = require('../../sequelize/models'),
      subjectssemesterSchema = require('../schemas/subjectssemester');

const statusScalar = require('../scalars/statusScalar');

module.exports = {
  create_SubjectSemester: {
    type: subjectssemesterSchema,
    args: {
      section     : { type: new GraphQLNonNull(GraphQLInt) },
      status      : { type: new GraphQLNonNull(statusScalar) },
      user_id     : { type: new GraphQLNonNull(GraphQLID) },
      subject_id  : { type: new GraphQLNonNull(GraphQLID) },
      semester_id : { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async(root, args) =>{
      const subjectsemester_created = await models.subjectssemester.create({
        section     : (args.section     != null && args.section.trim() != "") ? args.section.trim() : null,
        user_id     : (args.user_id     != null) ? args.user_id     : null,
        subject_id  : (args.subject_id  != null) ? args.subject_id  : null,
        semester_id : (args.semester_id != null) ? args.semester_id : null,
        status_id   : args.status 
      });
      return subjectsemester_created;
    }
  },
  

  
  update_SubjectSemester: {
    type: subjectssemesterSchema,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'El ID del registro a modificar.',
      },
      section     : { type: GraphQLString },
      status      : { type: statusScalar },
      user_id     : { type: GraphQLID },
      subject_id  : { type: GraphQLID },
      semester_id : { type: GraphQLID },
    },
    resolve: async(root, args) =>{
      const subjectsemester = await models.subjectssemester.findByPk(args.id);
      if (subjectsemester != null){
        var subjectsemester_updated = await subjectsemester.update({
          // Si las entradas llegan vacias o son null dejamos su valor anterior
          section     : (args.section     != null && args.section.trim() != "") ? args.section.trim() : subjectsemester.section,
          user_id     : (args.user_id     != null) ? args.user_id     : subjectsemester.user_id,
          subject_id  : (args.subject_id  != null) ? args.subject_id  : subjectsemester.subject_id,
          semester_id : (args.semester_id != null) ? args.semester_id : subjectsemester.semester_id,
          status_id   : (args.status != null) ? args.status : subjectsemester.status_id,
        });
      }
      return subjectsemester_updated;    
    }
  },
}

