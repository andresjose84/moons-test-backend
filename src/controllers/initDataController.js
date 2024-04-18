const { response } = require( 'express' );
const initData = require( '../database/initData' );

const initController = async ( req, res = response ) => {
    try {
        const data = await initData();

        res.status( 200 ).json( data );
    } catch ( error ) {
        res.status( 403 ).send( error );
    }
};

module.exports = initController;