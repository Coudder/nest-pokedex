import { join } from 'path'; //node
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [ 

    //* configuramos las variables de entorno SIEMPRE HASTA ARRIBA
    ConfigModule.forRoot({
      load: [ EnvConfiguration ], //nuestra configuracion de variables de entorno lo cargamos
      validationSchema: JoiValidationSchema
    }),

    ServeStaticModule.forRoot({ //importamos para poder ver nuestro html statico
      rootPath: join(__dirname,'..','public'),
    }),

    MongooseModule.forRoot( process.env.MONGODB, {
      dbName: 'pokemondb' //para que railway tome este nombre a nuestra base de datos ya en produccion
    } ), //configuramos nuestra base de datos
    //MongooseModule.forRoot( 'mongodb://localhost:27017/nest-pokemon' ), //configuramos nuestra base de datos

    PokemonModule,

    CommonModule,

    SeedModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}


/**
 * PARA CONECTA A NUESTRA BD DE MONGOOSE QUE ESTA EN DOCKER INSTALAMOS :  npm i @nestjs/mongoose mongoose
 * Y AQUI CONFIGURAMOS MONGOOSEMODULE Y LE PASAMOS LA DIRECCION
 * 
 * * PARA LAS VARIABLES DE ENTORNO INSTALAMOS NPM I @NESTJS/CONFIG
 * * Y AQUI EN APP.MODULE LO CONFIGURAMOS AL INICIO DE LOS IMPORTS CONFIGURE.MODULE.FORROOT()
 */
