const { Router } = require( 'express' );

const queryCollections = require( '../controllers/smileCenterController' );
const initController = require( '../controllers/initDataController' );

const router = Router();

router.get( '/smilecenters', queryCollections );
router.get( '/smilecenters/init', initController );
router.get( '/smilecenters/status', ( req, res ) => {
    res.status( 200 ).send( 'ok' );
} );

router.post( '*', ( req, res ) => {
    res.status( 403 ).send( '403 Forbidden' );
} );
router.delete( '*', ( req, res ) => {
    res.status( 403 ).send( '403 Forbidden' );
} );
router.patch( '*', ( req, res ) => {
    res.status( 403 ).send( '403 Forbidden' );
} );
router.options( '*', ( req, res ) => {
    res.status( 403 ).send( '403 Forbidden' );
} );
router.put( '*', ( req, res ) => {
    res.status( 403 ).send( '403 Forbidden' );
} );

module.exports = router;