const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

const router = require('express').Router()

// Se crea el esquema usando el lenguaje de esquema GraphQL
let schema = buildSchema(`
  type Query {
    hello_GraphQL: String
  }
`);

//  root proporcina una funcion de resolucion para el endpoint
let root = {
  // Asegurate que sea el mismo nombre que en el schema
  hello_GraphQL: () => {
    return 'Hola GraphQL :D';
  }
};

router.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

module.exports = router;
