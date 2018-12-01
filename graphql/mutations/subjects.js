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
      subjectSchema = require('../schemas/subjects');

const statusScalar = require('../scalars/statusScalar');

module.exports = {
  create_Subject:{
    type: subjectSchema,
    args: {
      enrollment : { type: new GraphQLNonNull(GraphQLString) },
      name       : { type: new GraphQLNonNull(GraphQLString) },
      status     : { type: new GraphQLNonNull(statusScalar) },
    },
    resolve: async(root, args) =>{
      const subject_created = await models.subjects.create({
        enrollment: (args.enrollment != null && args.enrollment.trim() != "" ) ? args.enrollment.trim() : null,
        name      : (args.name       != null && args.name.trim()       != "" ) ? args.name.trim()       : null,
        status_id : args.status,
      });
      return subject_created;
    }
  },


  update_Subject:{
    type: subjectSchema,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'El ID del registro a modificar.',
      },
      enrollment : { type: GraphQLString },
      name       : { type: GraphQLString },
      status     : { type: statusScalar },
    },
    resolve: async(root, args) =>{
      const subject = await models.subjects.findByPk(args.id);
      if (subject != null){
        var subject_updated = await subject.update({
          // Si las entradas llegan vacias o son null dejamos su valor anterior
          enrollment : (args.enrollment != null && args.enrollment.trim() != "" ) ? args.enrollment.trim() : subject.enrollment,
          name       : (args.name       != null && args.name.trim()       != "" ) ? args.name.trim()       : subject.name,
          status_id  : (args.status != null) ? args.status : subject.status_id,
        });
      }
      return subject_updated;    
    }
  },
  

}

