const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../databases/config');
class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        //Conectar base de datos

        this.connectedDB();
        //Middlewares
        this.middlewares();
        //Rutas de mi app
        this.routes();
    };

    async connectedDB(){
        await dbConnection();
    }
    
    middlewares(){

        //CORS
        this.app.use(cors());

        // Parseo y lectura del body
        this.app.use( express.json() );

        //Directorio Público
        this.app.use(express.static('public'));

    }

    routes(){
        
        this.app.use(this.usuariosPath, require('../routers/usuarios'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        });
    }

}

module.exports = Server;