const graphqlHTTP  = require('express-graphql');
const router       = require('express').Router();
const cors         = require('cors'); // Para que se pueda acceder desde otros origenes

const schema = require('../graphql/index');

router.use(cors());
router.use('/', graphqlHTTP({
  schema:   schema,
  graphiql: true,
  pretty:   true
}));

module.exports = router;