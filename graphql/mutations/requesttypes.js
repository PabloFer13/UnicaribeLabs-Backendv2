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
      requesttypesSchema = require('../schemas/requesttypes');
      
const statusScalar = require('../scalars/statusScalar');

module.exports = {
  create_RequestType: {
    type: requesttypesSchema,
    args: {
      type   : { type: new GraphQLNonNull(GraphQLString) },
      color  : { type: new GraphQLNonNull(GraphQLString) },
      status : { type: new GraphQLNonNull(statusScalar) },

    },
    resolve: async(root, args) =>{
      const requesttype_created = await models.requesttypes.create({
        type      : (args.type  != null && args.type.trim()  != "" ) ? args.type.trim()  : null,
        color     : (args.color != null && args.color.trim() != "" ) ? args.color.trim() : null,
        status_id : args.status,
      });
      return requesttype_created;
    }
  },
  

  update_RequestType: {
    type: requesttypesSchema,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'El ID del registro a modificar.',
      },
      type   : { type: GraphQLString },
      color  : { type: GraphQLString, description: 'En hexadecimal' },
      status : { type: statusScalar },
    },
    resolve: async(root, args) =>{
      const requesttype = await models.requesttypes.findByPk(args.id);
      if (requesttype != null){
        var requesttype_updated = await requesttype.update({
          // Si las entradas llegan vacias o son null dejamos su valor anterior
          type      : (args.type   != null && args.type.trim()  != "" ) ? args.type.trim()  : requesttype.type,
          color     : (args.color  != null && args.color.trim() != "" ) ? args.color.trim() : requesttype.color,
          status_id : (args.status != null) ? args.status : requesttype.status_id,
        });
      }
      return requesttype_updated;    
    }
  },
}

