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
const bcrypt = require('bcryptjs');

const models     = require('../../sequelize/models'),
      userSchema = require('../schemas/users');

module.exports = {
  create_Teacher:{
    type: userSchema,
    args: {
      first_name   : { type: new GraphQLNonNull(GraphQLString) },
      last_name    : { type: new GraphQLNonNull(GraphQLString) },
      email        : { type: new GraphQLNonNull(GraphQLString) },
      password     : { type: new GraphQLNonNull(GraphQLString) },
      url_pp       : { type: GraphQLString },
      phone_number : { type: GraphQLString },
    },
  
    resolve: async (root, args) =>{
      const regexEmail = /^([a-z])+(@ucaribe\.edu\.mx)$/;
      const user_created = await models.users.create({
        // Comprobamos si el correo es de la universidad '@ucaribe.edu.mx'
        email       : (args.email != null && args.email.trim() != "" && regexEmail.test(args.email.trim())) ? args.email.trim() : null,
        first_name  : (args.first_name   != null && args.first_name.trim()   != "") ? args.first_name.trim()                    : null,
        last_name   : (args.last_name    != null && args.last_name.trim()    != "") ? args.last_name.trim()                     : null,
        password    : (args.password     != null && args.password.trim()     != "") ? bcrypt.hashSync(args.password.trim(), 10) : null,
        url_pp      : (args.url_pp       != null && args.url_pp.trim()       != "") ? args.url_pp.trim()                        : null,
        phone_number: (args.phone_number != null && args.phone_number.trim() != "") ? args.phone_number.trim()                  : null,
        state       : false,
        userType_id : 3, // El valor 3 es porque en la base de datos el ID del docente es el 3
      });
      return user_created;
    }
  },


  create_Trainee:{
    type: userSchema,
    args: {
      // Comprobar que el administrador crea un nuevo becario
      admin_email: {
        type: new GraphQLNonNull(GraphQLString)
      },
      admin_password: { type: new GraphQLNonNull(GraphQLString) },
      // Datos del nuevo becario
      enrollment    : { type: new GraphQLNonNull(GraphQLString) },
      first_name    : { type: new GraphQLNonNull(GraphQLString) },
      last_name     : { type: new GraphQLNonNull(GraphQLString) },
      email         : { type: new GraphQLNonNull(GraphQLString) },
      password      : { type: new GraphQLNonNull(GraphQLString) },
      url_pp        : { type: GraphQLString },
      phone_number  : { type: GraphQLString },
    },
  
    resolve: async (root, args) =>{
      const regexEmail = /^([0-9])+(@ucaribe\.edu\.mx)$/;
      const user = await models.users.findOne({
        include: [ { model: models.usertypes } ],
        where: { email: args.admin_email }
      });
      // Comprobamos si el email y contraseña pertenecen a un administrador
      if (user != null && bcrypt.compareSync(args.admin_password, user.password) && user.usertype.type == "Administrador"){
        const user_created = await models.users.create({
          // Comprobamos si el correo es de la universidad '@ucaribe.edu.mx'
          email       : (args.email != null && args.email.trim() != "" && regexEmail.test(args.email.trim())) ? args.email.trim() : null,
          
          enrollment  : (args.enrollment   != null && args.enrollment.trim()   != "") ? args.enrollment.trim()                    : null,
          first_name  : (args.first_name   != null && args.first_name.trim()   != "") ? args.first_name.trim()                    : null,
          last_name   : (args.last_name    != null && args.last_name.trim()    != "") ? args.last_name.trim()                     : null,
          password    : (args.password     != null && args.password.trim()     != "") ? bcrypt.hashSync(args.password.trim(), 10) : null,
          url_pp      : (args.url_pp       != null && args.url_pp.trim()       != "") ? args.url_pp.trim()                        : null,
          phone_number: (args.phone_number != null && args.phone_number.trim() != "") ? args.phone_number.trim()                  : null,
          state       : false,
          state_email : false,
          userType_id : 2, // El valor 2 es porque en la base de datos el ID del becario es el 2
        });
        return user_created;
      }
    

    }
  },
  

  
  update_User:{
    type: userSchema,
    args: {
      id          : {type: new GraphQLNonNull(GraphQLID) },
      first_name  : { type: GraphQLString },
      last_name   : { type: GraphQLString },
      url_pp      : { type: GraphQLString },
      phone_number: { type: GraphQLString }
    },
    resolve: async(root, args) =>{
      const user = await models.users.findByPk(args.id, {
        attributes: { exclude: ['password'] }
      });
      if (user != null){
        var user_updated = await user.update({
          // Si las entradas llegan vacias o son null dejamos su valor anterior
          first_name   : (args.first_name   != null && args.first_name.trim()!= "") ? args.first_name.trim()   : user.first_name,
          last_name    : (args.last_name    != null && args.last_name.trim() != "") ? args.last_name.trim()    : user.last_name,
          url_pp       : (args.url_pp       != null) ? args.url_pp.trim()       : user.url_pp,
          phone_number : (args.phone_number != null) ? args.phone_number.trim() : user.phone_number,
        });
      }
      return user_updated;    
    }
  },
  


  update_User_password:{
    type: userSchema,
    args: {
      id           : { type: new GraphQLNonNull(GraphQLID) },
      password     : { type: new GraphQLNonNull(GraphQLString) },
      new_password : { type: GraphQLString }
    },
    resolve: async(root, args) =>{
      const user = await models.users.findByPk(args.id);
      if (user != null && bcrypt.compareSync(args.password, user.password)){
        var user_updated = await user.update({
          password: bcrypt.hashSync(args.new_password.trim(), 10)
        });
      }
      return user_updated;    
    }
  }

}

