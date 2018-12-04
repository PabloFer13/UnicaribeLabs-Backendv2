const express = require('express');
// Importamos nuestros archivos de configuración para las rutas
const Routes = require('./routes/index.js'); 
require('dotenv').config();

class App {
	/**
	 * Establece las propiedades que utilizara esta clase para crear el servidor
	 */
	constructor() {
		this.expressApp = express();
		// Objeto que contiene las configuraciones
		this.configs = {
			get port(){
				return process.env.PORT || 3001;
			}
		};
	}
	/**
	 * Aplica cualquier middleware para ser utilizado por nuestra aplicacion
	 */
	applyMiddleware() {
		// Permite al servidor analizar el json
		this.expressApp.use(express.json());
		// Registra las rutas utilizadas por la aplicacion
		new Routes(this.expressApp);
	}
	/**
	 * Este metodo ejecuta la aplicacion
	 */
	run() {
		this.expressApp.listen(this.configs.port, () => {
			console.log(`Running on port ${this.configs.port}.`);
			console.log(`Environment: ${process.env.STAGE || "development"}`);
		});
	}
}

const app = new App();
app.applyMiddleware();
app.run();
