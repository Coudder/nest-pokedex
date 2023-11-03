import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [

    ConfigModule, //IMPORTAMOS EL CONFIGUMODULE PARA PODER USARLO EN NUESTRO SERVICIO

    //*EN ESTE MODULO CONFIGURAMOS EL FEATURE DEL SCHEMA QUE CREAMOS 
    MongooseModule.forFeature([
      {
        name: Pokemon.name ,
        schema: PokemonSchema ,
      }
    ])
  ],
  exports: [
    MongooseModule
  ]
})
export class PokemonModule {}

/**
 * * coCONFIGURAMOS AQUI EL MONGOOSEMODULE.FORFEATURE PORQUE AQUI ES DONDE TIENE RELACION NUESTROS POKEMONS, AL CREAR AQUI ESTO, NOS GENERA
 * * EN MONGODB LA COLECCIION DE POKEMONS PARA YA PODER HACER EL CRUD EL POKEMON.NAME Y POKEMONSCHEMA VIENEN DE NUESTRA ENTITY
 */