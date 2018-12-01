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
      statusSchema = require('../schemas/statuses');

module.exports = {

  create_Status: {
    type: statusSchema,
    args: {
      status: { type: new GraphQLNonNull(GraphQLString) },
      state : { type: new GraphQLNonNull(GraphQLBoolean) },
    },
    resolve: async(root, args) =>{
      const status_created = await models.statuses.create({
        status : (args.status != null && args.status.trim() != "") ? args.status.trim() : null,
        state  : (args.state  != null) ? args.state : null,
      });
      return status_created;
    }
  },
  

  update_Status: {
    type: statusSchema,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'El ID del registro a modificar.',
      },
      status : { type: GraphQLString },
      state  : { type: GraphQLBoolean },
    },
    resolve: async(root, args) =>{
      const status = await models.statuses.findByPk(args.id);
      if (status != null){
        var status_updated = await status.update({
          // Si las entradas llegan vacias o son null dejamos su valor anterior
          status : (args.status != null && args.status.trim() != "" ) ? args.status.trim() : status.status,
          state  : (args.state  != null) ? args.state : status.state,
        });
      }
      return status_updated;    
    }
  },
}

