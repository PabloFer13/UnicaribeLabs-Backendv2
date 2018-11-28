const graphql = require('./graphql.js')

// Unicamente exportamos la clase Routes
module.exports = class Routes{
	/**
	 * Aplica las rutas a rutas específicas
	 * @param {*} app - La instancia de express
	 */
	constructor(app) {
		// Se lanza el error si no se pasó ninguna instancia de express
		if (app == null) throw new Error("You must provide an instance of express");

		// Registra el GraphQL endpoint
		app.use('/graphql', graphql);
	}
}
