const {
  GraphQLEnumType
} = require('graphql');

// Los valores del Scalar estan definidos por los registros en la base de datos y corresponden al ID
module.exports = new GraphQLEnumType({
    name: 'usertypeScalar',
    values: {
      Administrador : { value: 1 },
      Encargado     : { value: 2 },
      Becario       : { value: 3 },
      Profesor      : { value: 4 },
      Alumno        : { value: 5 },
    }
  });
