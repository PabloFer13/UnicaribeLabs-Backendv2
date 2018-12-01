const {
  GraphQLEnumType
} = require('graphql');

// Los valores del Scalar estan definidos por los registros en la base de datos y corresponden al ID
module.exports = new GraphQLEnumType({
    name: 'statusScalar',
    values: {
      Activo    : { value: 1 },
      Inactivo  : { value: 2 },
      Pendiente : { value: 3 },
      Aceptado  : { value: 4 },
      Rechazado : { value: 5 },
      Eliminado : { value: 6 }
    }
  });
