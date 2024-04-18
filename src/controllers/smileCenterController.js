const { response } = require( 'express' );
const queryData = require( '../database/queryData' );

const queryCollections = async ( req, res = response ) => {

    try {
        const data = await queryData( req.query );

        res.status( 200 ).json( data );
    } catch ( error ) {
        res.status( 403 ).send( error );
    }

};


module.exports = queryCollections;