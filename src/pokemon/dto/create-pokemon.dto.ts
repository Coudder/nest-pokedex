

//* DATA QUE RECIBIMOS DEL BODY PARA VALIDAR 

import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {

    @IsInt()
    @IsPositive()
    @Min(1)
    no:number;

    @IsString()
    @MinLength(1)
    name:string;


}



/**
 * * INSTALAMOS  NPM I class-validator class-transformer para poder usar los decoradores de validacion
 */
