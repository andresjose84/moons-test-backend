const { Router } = require( 'express' );

const queryCollections = require( '../controllers/smileCenterController' );
const initController = require( '../controllers/initDataController' );

const router = Router();

router.get( '/', queryCollections );
router.get( '/init', initController );

module.exports = router;