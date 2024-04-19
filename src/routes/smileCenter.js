const { Router } = require( 'express' );

const queryCollections = require( '../controllers/smileCenterController' );
const initController = require( '../controllers/initDataController' );

const router = Router();

router.get( '/smilecenters', queryCollections );
router.get( '/smilecenters/init', initController );

module.exports = router;