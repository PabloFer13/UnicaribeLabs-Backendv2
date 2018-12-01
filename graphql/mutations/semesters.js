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
      semesterSchema = require('../schemas/semesters');
  
const statusScalar = require('../scalars/statusScalar');

module.exports = {

  create_Semester: {
    type: semesterSchema,
    args: {
      semester   : { type: new GraphQLNonNull(GraphQLString) },
      start_date : { type: new GraphQLNonNull(GraphQLString) },
      end_date   : { type: new GraphQLNonNull(GraphQLString) },
      status     : { type: new GraphQLNonNull(statusScalar) },
    },
    resolve: async(root, args) =>{
      const semester_created = await models.semesters.create({
        semester   : (args.semester   != null && args.semester.trim()   != "" ) ? args.semester.trim()   : null,
        start_date : (args.start_date != null && args.start_date.trim() != "" ) ? args.start_date.trim() : null,
        end_date   : (args.end_date   != null && args.end_date.trim()   != "" ) ? args.end_date.trim()   : null,
        status_id  : args.status, 
      });
      return semester_created;
    }
  },
  

  update_Semester: {
    type: semesterSchema,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'El ID del registro a modificar.',
      },
      semester   : { type: GraphQLString },
      start_date : { type: GraphQLString, description: 'YYYY-MM-DD' },
      end_date   : { type: GraphQLString, description: 'YYYY-MM-DD' },
      status     : { type: statusScalar },
    },
    resolve: async(root, args) =>{
      const semester = await models.semesters.findByPk(args.id);
      if (semester != null){
        var semester_updated = await semester.update({
          // Si las entradas llegan vacias o son null dejamos su valor anterior
          semester   : (args.semester   != null && args.semester.trim()   != "" ) ? args.semester.trim()   : semester.semester,
          start_date : (args.start_date != null && args.start_date.trim() != "" ) ? args.start_date.trim() : semester.start_date,
          end_date   : (args.end_date   != null && args.end_date.trim()   != "" ) ? args.end_date.trim()   : semester.end_date,
          status_id  : (args.status != null) ? args.status : semester.status_id,     
        });
      }
      return semester_updated;    
    }
  },

}

