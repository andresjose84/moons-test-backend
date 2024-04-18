const Parse = require( 'parse/node' );

const initData = async () => {
    const data = {
        types: [],
        zones: [],
        services: []
    };

    const mapServices = new Map();
    const mapZones = new Map();
    const mapCenter = new Map();

    Parse.initialize( process.env.APP_ID, process.env.JS_KEY );
    Parse.serverURL = process.env.URL;
    const SmileCenters = Parse.Object.extend( 'SmileCenters' );
    const query = new Parse.Query( SmileCenters );

    try {
        const results = await query.find();
        for ( const object of results ) {

            const services = object.get( 'Services' );
            const zones = object.get( 'Zone' );
            const types = object.get( 'Center_Type' );

            if ( types )
                mapCenter.set( types, types );
            if ( zones )
                mapZones.set( zones, zones );
            if ( services )
                if ( Object.keys( services ).length > 0 )
                    Object.keys( services ).forEach( ele => mapServices.set( ele, ele ) );
        }

        mapCenter.forEach( ( ele, key ) => data.types.push( key ) );
        mapZones.forEach( ( ele, key ) =>  data.zones.push( key ) );
        mapServices.forEach( ( ele, key ) => data.services.push( key ) );

        data.types.sort();
        data.zones.sort();
        data.services.sort();

        return data;
    } catch ( error ) {
        console.log( 'error', error );
        return {
            types: [],
            zones: [],
            services: []
        };
    }
};

module.exports = initData;