import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';


//hace las propiedades del createpokemon opcionales para poder modificar el no o name
export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
