require('dotenv').config();

const express = require( 'express' );
const app = express();
const path = require( 'path' );
const cors = require( 'cors' );
const port = !process.env.PORT ? '3000' : process.env.PORT;

//console.log(process.env);

//CORS
app.use( cors() );

//Directorio Publico
app.use( express.static( path.join( __dirname, 'src/public' ) ) );

//Lectura y parseo del body
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

//Rutas:
app.use( '/api/v1/', require( './src/routes/smileCenter' ) );

app.get( '*', ( req, res ) => {
    res.sendFile( __dirname + '/src/public/index.html' );
} );

app.listen( port, () => console.log( `App listening on port ${ port }!` ) );