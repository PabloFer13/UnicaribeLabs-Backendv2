const {
  GraphQLEnumType
} = require('graphql');

// Los valores del Scalar estan definidos por los registros en la base de datos y corresponden al ID
module.exports = new GraphQLEnumType({
    name: 'usertypeScalar',
    values: {
      Administrador : { value: 1 },
      Becario       : { value: 2 },
      Profesor      : { value: 3 },
    }
  });
