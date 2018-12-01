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
      userTypesSchema = require('../schemas/usertypes');

const statusScalar = require('../scalars/statusScalar');
 

module.exports = {
  create_Usertype:{
    type: userTypesSchema,
    args: {
      type        : { type: new GraphQLNonNull(GraphQLString) },
      permissions : { type: GraphQLString },
      status      : { type: new GraphQLNonNull(statusScalar) },
    },
    resolve: async(root, args) =>{
      const usertype_created = await models.usertypes.create({
        type        : (args.type        != null && args.type.trim()        != "" ) ? args.type.trim()        : null,
        permissions : (args.permissions != null && args.permissions.trim() != "" ) ? args.permissions.trim() : null,
        status_id   : args.status 
      });
      return usertype_created;
    }
  },

  update_Usertype:{
    type: userTypesSchema,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'El ID del registro a modificar.',
      },
      type        : { type: GraphQLString },
      permissions : { type: GraphQLString },
      status      : { type: statusScalar }
    },
    resolve: async(root, args) =>{
      const usertype = await models.usertypes.findByPk(args.id);
      if (usertype != null){
        var usertype_updated = await usertype.update({
          // Si las entradas llegan vacias o son null dejamos su valor anterior
          type        : (args.type        != null && args.type.trim() != "" ) ? args.type.trim()        : usertype.type,
          permissions : (args.permissions != null)                            ? args.permissions.trim() : usertype.permissions,
          status_id   : args.status  
        });
      }
      return usertype_updated;    
    }
  },


}

