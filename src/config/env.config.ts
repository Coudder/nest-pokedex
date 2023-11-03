//*CONFIGUARAMOS NUESTRAS VARIABLES POR ESI ESTAN O NO LOS VALORES POR DEFECTO 

//*CN ESTE ARCHIVO MAPEAMOS NUESTRAS VARIABLES DE ENTORNO


export const EnvConfiguration = () => ({

    enviroment: process.env.NODE_ENV || 'dev', //si no la tenemos esta en desarrollo
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3002, 
    defaultLimit: +process.env.DEFAULT_LIMIT || 7, //si usamos el validation schema hay que poner el + para convertir este a numero
})




//* esto es lo de arriba
// const envfb = () => {
//     return {

//     }
// }