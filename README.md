
# Prueba tecnica Moons - Senior Backend Developer

Con esta api se consultan los datos de los Smile Centers asociados a Moons.

## Comenzando

Estas instrucciones te proporcionarán una copia del proyecto en funcionamiento en tu máquina local para fines de desarrollo y pruebas. Mira **Instalación** para saber cómo desplegar el proyecto.

### Prerrequisitos

Qué cosas necesitas instalar el software y cómo instalarlas

```
node --version
npm --version
```

### Instalación

Clonar el repositorio
```
https://github.com/andresjose84/moons-test-backend/
```

Instala las dependencias del proyecto:
```
cd moons-test-backend
npm install
```

Configura las variables de entorno:
```
cp .env.template .env
```

Se debe tener una cuenta en Back4app 

https://www.back4app.com/docs/get-started/welcome

Para poder configurar las variables de entorno.

Corre el servidor de desarrollo:
```
npm start
```

Construido con:

    Express - El framework web usado
    Node.js - Entorno de ejecución para JavaScript

## Documentacion del API

### Como consumir el api

El api puede ser probada en el siguiente link:
https://moons-test-backend.onrender.com

- **URL**: `/api/v1/smilecenters`
- **Método**: `GET`

- **Parámetros URL**:
  - `center_type` (opcional): Se selecciona de un listado de tipos de centros asociados.
  - `zone` (opcional): Se selecciona de un listado de zonas disponibles.
  - `services` (opcional): Se selecciona de un listado de servicios prestados en los centros asociados.

- **Body**:
 - `Center_Name` (obligatorio): Nombre de los centros smile asociados.
 - `Center_Type` (opcional): Tipo de centro smile.
 - `Zone` (opcional): Zona a la cual esta asociado.
 - `Timetable` (opcional): Arreglo de horarios de atención.
 - `Horarios` (opcional): Horarios de atención.
 - `Promo` (opcional): Promociones si las tiene.
 - `Direccion` (obligatorio): Direccion del centro smile.
 - `Services` (opcional): Servicios prestados en el centro smile.
 - `Calendar_Id` (opcional): Id del calendario.
 - `Appointment_Type_Id` (obligatorio): Id para realizar citas.

- **Respuesta**

- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Contenido**:
    ```json
    {
        "nombre_zona": [
            {
                "Center_Name": "xxxxx xxxx",
                "Center_Type": "xxxxx",
                "Zone": "nombre_zona",
                "Timetable": {
                },
                "Direccion": "xxxxxxxxxxxxx xxxxxxx",
                "Services": {
                },
                "Calendar_Id": 123123123,
                "Horario": "xxxxxx"
            }
        ]
    }
    ```

- **Respuesta de Error**:
  - **Código**: 403 BAD REQUEST
  - **Contenido**:
    ```string
    Error message
    ```

- **URL**: `/api/v1/smilecenters/init`
- **Método**: `GET`

- **Parámetros URL**:
  - No necesita parametros, trae la lista de zonas, centros y servicios para utilizar en el api de smilecenters.

- **Body**:
 - `types` (obligatorio): Listado de tipos de centros smile.
 - `zones` (obligatorio): Zonas asociadas a centros smile.
 - `services` (obligatorio): Servicios realizados en centros smile.

- **Respuesta**

- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Contenido**:
    ```json
    {
      "types": [
      ],
      "zones": [
      ],
      "services": [
      ]
    }
    ```

- **Respuesta de Error**:
  - **Código**: 403 BAD REQUEST
  - **Contenido**:
    ```string
    Error message
    ```


## Authors

- [@andresjose84](https://github.com/andresjose84)

