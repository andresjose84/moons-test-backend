const Parse = require( 'parse/node' );

const queryData = async params => {

    const data = {};

    const {
        center_type,
        zone,
        services
    } = params;


    Parse.initialize( process.env.APP_ID, process.env.JS_KEY );
    Parse.serverURL = process.env.URL;
    const SmileCenters = Parse.Object.extend( 'SmileCenters' );
    const query = new Parse.Query( SmileCenters );

    if ( center_type )
        query.equalTo( 'Center_Type', center_type );

    if ( zone )
        query.equalTo( 'Zone', zone );

    if ( services )
        query.exists( `Services.${ services }` );

    try {

        const results = await query.find();

        for ( const object of results ) {
            const res = {
                Center_Name: object.get( 'Center_Name' ),
                Center_Type: object.get( 'Center_Type' ),
                Zone: object.get( 'Zone' ),
                Direccion: "",
                Services: object.get( 'Services' ),
                Calendar_Id: object.get( 'Calendar_Id' ),
                Appointment_Type_Id: object.get( 'Appointment_Type_Id' )
            };

            //Cambiamos los datos de Appointment_Type_Id si en la busqueda llega el servicio
            if ( services )
                res.Appointment_Type_Id = !res.Services[ services ].AppointmentTypeId ? res.Appointment_Type_Id : res.Services[ services ].AppointmentTypeId;

            if ( !data[ res.Zone ] )
                data[ res.Zone ] = [];

            data[ res.Zone ].push( res )

        }

        return data;
    } catch ( error ) {
        console.log( 'error query', JSON.stringify( error, null, 2 ) );
        return [];
    }

}

module.exports = queryData;