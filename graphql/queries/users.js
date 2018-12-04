const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

const models  = require('../../sequelize/models/index');
const userSchema = require('../schemas/users');

module.exports = {
  select_Users: {
    type: new GraphQLList(userSchema),
    args:{
      id        : { type: GraphQLID },
      email     : { type: GraphQLString },
      first_name: { type: GraphQLString },
      last_name : { type: GraphQLString },
      
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
      
      return models.users.findAll({ attributes: { exclude: ['password'] },
        where: args,
        offset,
        limit,
      });
    }
  },
  login: {
    type: userSchema,
    args:{
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    async resolve(root, args) {
      const { email, password } = args;
      const user = await models.users.findOne({ where: { email } });

      if(!user){
        throw new Error('Email no registrado');
      }

      if(!bcrypt.compareSync(password, user.password)){
        throw new Error('Password Incorrecto')
      }

      const obj = {
        name: user.first_name,
        lastName: user.last_name,
        email: user.email
      };

      user.token = jwt.sign(obj, process.env.SECRET);
      
      return user;
    }
  }
}