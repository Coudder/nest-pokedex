import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


/** REPRESENTACION DE LO QUE GRABAREMOS EN LA BD COMO LUCE NUESTRA TABLA O COLECCION */
//usamos el decorador Schema
@Schema()      //y extendemos de Document que es de mongoose para que nos lo agarre como unSchema de nuestr acoleccion
export class Pokemon extends Document {
    //id:string //Mongo nos da el mongoid
    
    @Prop({
        unique: true,
        index:true //para hacer mas rapido las busquedas
    })
    name:string;

    @Prop({
        unique: true,
        index:true //para hacer mas rapido las busquedas
    })
    no:number;
}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon );
