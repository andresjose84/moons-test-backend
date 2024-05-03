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

    query.ascending('Zone');

    try {

        const results = await query.find();
        const horario = {
            'weekdays': 'L-V',
            'saturday': 'S',
            'sunday': 'D'
        };

        for ( const object of results ) {
            const zone = object.get( 'Zone' );
            if ( object.get( 'Zone' ) ) {

                let direccion = '';
                if ( object.get( 'Street' ) )
                    direccion += object.get( 'Street' ) + ' ';

                if ( object.get( 'Number' ) )
                    direccion += object.get( 'Number' ) + ', ';

                if ( object.get( 'Apt' ) )
                    direccion += object.get( 'Apt' ) + ', ';

                if ( object.get( 'City' ) )
                    direccion += object.get( 'City' ) + ', ';

                if ( object.get( 'Country' ) )
                    direccion += object.get( 'Country' );

                const res = {
                    Center_Name: object.get( 'Center_Name' ),
                    Center_Type: object.get( 'Center_Type' ),
                    Zone: zone,
                    Timetable: object.get( 'Timetable' ),
                    Promo: object.get( 'promo' ),
                    Direccion: direccion,
                    Services: object.get( 'Services' ),
                    Calendar_Id: object.get( 'Calendar_Id' ),
                    Appointment_Type_Id: object.get( 'Appointment_Type_Id' )
                };

                if ( res.Timetable ) {
                    res.Horario = Object.keys( res.Timetable ).reduce( ( acc, current ) => {
                        if ( acc === '' ) {
                            return `${ acc }  ${ horario[ current ] } ${ res.Timetable[ current ][ 0 ] }`
                        } else {
                            return `${ acc } / ${ horario[ current ] } ${ res.Timetable[ current ][ 0 ] }`
                        }
                    }, '' );
                } else {
                    res.Horario = '';
                }


                //Cambiamos los datos de Appointment_Type_Id si en la busqueda llega el servicio
                if ( services )
                    res.Appointment_Type_Id = !res.Services[ services ].AppointmentTypeId ? res.Appointment_Type_Id : res.Services[ services ].AppointmentTypeId;

                if ( !data[ res.Zone ] )
                    data[ res.Zone ] = [];

                data[ res.Zone ].push( res )
            }



        }

        return data;
    } catch ( error ) {
        console.log( 'error query', error );
        return {};
    }

}

module.exports = queryData;