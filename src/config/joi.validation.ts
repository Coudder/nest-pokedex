import * as Joi from "joi";

//JOIN LO USAMOS PARA LAS REGLAS DE VALIDACION DE NUESTRAS VARIABLES DE ENTORNO 
//npm i joi

export const JoiValidationSchema = Joi.object({
    MONGODB: Joi.required(), //es requerido
    PORT: Joi.number().default(3005) , //si no viene usa el pouerto 3005
    DEFAULT_LIMIT: Joi.number().default(6),
});