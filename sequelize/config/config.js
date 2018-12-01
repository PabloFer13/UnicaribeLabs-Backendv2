// Logging: puedes desactivar la impresión de sql estableciendo a false  o por default: console.log
// operatorsAliases evita el warning: "sequelize deprecated String based operators are now deprecated".  

module.exports ={
  "development"       : {
    "username"        : "root",
    "password"        : null,
    "database"        : "ucaribelabs",
    "host"            : "127.0.0.1",
    "dialect"         : "mysql",
    "timezone"        : "-05:00",
    "logging"         : console.log,
    "operatorsAliases": "false"

  },
  "test": {
    "username"        : "sql3267817",
    "password"        : "qq9HddYRs7",
    "database"        : "sql3267817",
    "host"            : "sql3.freemysqlhosting.net",
    "dialect"         : "mysql",
    "timezone"        : "-05:00",
    "logging"         : console.log,
    "operatorsAliases": "false"

  },
  "production"        : {
    "username"        : "root",
    "password"        : null,
    "database"        : "database_production",
    "host"            : "127.0.0.1",
    "dialect"         : "mysql",
    "timezone"        : "-05:00",
    "logging"         : console.log,
    "operatorsAliases": "false"

  }
}
