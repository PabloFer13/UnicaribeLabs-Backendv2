module.exports ={
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql",

    // Logging: puedes desactivar la impresión de sql estableciendo a false  o por default: console.log
    "logging": console.log,
    // Evita el warning: "sequelize deprecated String based operators are now deprecated".  
    "operatorsAliases": "false"

  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",

    // Logging: puedes desactivar la impresión de sql estableciendo a false  o por default: console.log
    "logging": console.log,
    // Evita el warning: "sequelize deprecated String based operators are now deprecated".  
    "operatorsAliases": "false"

  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",

    // Logging: puedes desactivar la impresión de sql estableciendo a false  o por default: console.log
    "logging": console.log,
    // Evita el warning: "sequelize deprecated String based operators are now deprecated".  
    "operatorsAliases": "false"

  }
}
