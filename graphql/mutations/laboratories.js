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
      laboratorySchema = require('../schemas/laboratories');

const statusScalar = require('../scalars/statusScalar');

module.exports = {
  create_Laboratory: {
    type: laboratorySchema,
    args: {
      name        : { type: new GraphQLNonNull(GraphQLString) },
      short_name  : { type: GraphQLString },
      building    : { type: new GraphQLNonNull(GraphQLString) },
      user_id     : { type: new GraphQLNonNull(GraphQLID) },
      description : { type: GraphQLString },
      status      : { type: new GraphQLNonNull(statusScalar) },
    },
    resolve: async(root, args) =>{
      const laboratory_created = await models.laboratories.create({
        name        : (args.name        != null && args.name.trim()        != "") ? args.name.trim()        : null,
        short_name  : (args.short_name  != null && args.short_name.trim()  != "") ? args.short_name.trim()  : null,
        building    : (args.building    != null && args.building.trim()    != "") ? args.building.trim()    : null,
        user_id     : args.user_id,
        description : (args.description != null && args.description.trim() != "") ? args.description.trim() : null,
        status_id   : args.status, 
      });
      return laboratory_created;
    }
  },


  update_Laboratory: {
    type: laboratorySchema,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'El ID del registro a modificar.',
      },
      // Nuevos valores
      name        : { type: GraphQLString },
      short_name  : { type: GraphQLString },
      building    : { type: GraphQLString },
      user_id     : { type: GraphQLID },
      description : { type: GraphQLString },
      status      : { type: statusScalar },
    },
    resolve: async(root, args) =>{
      const laboratory = await models.laboratories.findByPk(args.id);
      if (laboratory != null){
        var laboratory_updated = await laboratory.update({
          // Si las entradas llegan vacias o son null dejamos su valor anterior
          name        : (args.name        != null && args.name.trim()       != "" ) ? args.name.trim()       : laboratory.name,
          short_name  : (args.short_name  != null && args.short_name.trim() != "" ) ? args.short_name.trim() : laboratory.short_name,
          building    : (args.building    != null && args.building.trim()   != "" ) ? args.building.trim()   : laboratory.building,
          user_id     : (args.user_id     != null) ? args.user_id            : laboratory.user_id,
          description : (args.description != null) ? args.description.trim() : laboratory.description,
          status_id   : (args.status      != null) ? args.status             : laboratory.status_id,
        });
      }
      return laboratory_updated;    
    }
  },

}

