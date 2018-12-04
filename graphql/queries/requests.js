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

const models = require('../../sequelize/models/index');
const requestsSchema = require('../schemas/requests');
const { Op } = require('sequelize');

const requestsArray = new GraphQLList(requestsSchema);

module.exports = {
  select_Requests: {
    type: requestsArray,
    args:{
      // id:       { type: GraphQLID },
      // name:     { type: GraphQLString },
      // building: { type: GraphQLString },
      // state:    { type: GraphQLBoolean},
      
      offset: {
        type: GraphQLInt,
      },
      first: {
        type: GraphQLInt,
        description: 'Limits the number of results returned in the page. Defaults to 10.',
      }
    },
    resolve(root, args) {
      const offset = args.offset || 0;
      const limit  = args.first  || 10;
      delete args.offset;
      delete args.first;
      
      return models.requests.findAll({
        where: args,
        offset,
        limit,
      });
    }
  },

  user_Requests: {
    type: requestsArray,
    description: 'Solicitudes hechas por el usuario',
    args: {
      userId: { type: GraphQLID },
    },
    resolve(root, args){
      const { userId: user_id } = args;
      return models.requests.findAll({ where: { user_id }});
    }
  },

  encargado_Requests: {
    type: requestsArray,
    description: 'Solicitudes a los laboratorios de un encargado',
    args: {
      userId: { type: GraphQLID },
    },
    async resolve(root, args){
      const { userId: user_id } = args;
      const laboratorios = await models.laboratories.findAll({ where: { user_id } });
      const arr = [];
      const labsIds = laboratorios.reduce((acc, item) => [ ...acc, { laboratory_id: item.id }], arr);
      const requests = await models.requests.findAll({ where: { [Op.or]: labsIds }, order: [['createdAt', 'ASC']]  });
      return requests;
    }
  }

  
}