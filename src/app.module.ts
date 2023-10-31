import { join } from 'path'; //node
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [ 
    ServeStaticModule.forRoot({ //importamos para poder ver nuestro html statico
      rootPath: join(__dirname,'..','public'),
    }),

    MongooseModule.forRoot( 'mongodb://localhost:27017/nest-pokemon' ),

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
 */
