

import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.iterface';
import { RickmortyResponse } from './interfaces/rickmorty-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {


  constructor(
    @InjectModel( Pokemon.name ) //nombre del modelo osea la entidad
    private readonly pokemonModel: Model<Pokemon>,

    //inyectamos el adapter de axios htt de tipo axios adapter
    private readonly http: AxiosAdapter

  ){}
  


  async executeSeed() {

      //borramos todo al ejecutar el seed
      await this.pokemonModel.deleteMany({});
                            //usamos el adaptador
     const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10') ;
     console.log(data.results);


     //creamos un arreglo que contendra en el name  no de los pok,emon
     const pokemonToInsert:{ name:string, no:number }[] = [];

     data.results.forEach(({name, url})=>{
      const segment = url.split('/');
      const no = +segment[segment.length -2 ]; //-2 porque es el penultimo


      //insertamos la informacion en el arreglo
      pokemonToInsert.push({ name, no })

     });

     //guardamos la insercion en la bd en una sola peticion esta es la manera recomendable para las semillas
     await this.pokemonModel.insertMany(pokemonToInsert);



     //!metodo para insertar en un arreglo de promesas
    //  const insertPromisesArray = [];
   
      
    //  data.results.forEach(async ( {name, url} ) => {

    //     const segment = url.split('/');
    //     const no: number = +segment[segment.length -2 ]; //-2 porque es el penultimo


    //     //const pokemon = await this.pokemonModel.create({name, no})
    //     insertPromisesArray.push(
    //       this.pokemonModel.create({name, no})
    //     );

    //    // console.log({name, no});

    //  }); 
 
    //  await Promise.all(insertPromisesArray); 

     return 'Seed Executed'; 
  }


  //!AQUI COMO NO ME FUNCIONO LA APU DEL POKEAPI PARA NO DEJAR DE HACER EL EJERCICIO
  /**
   * !! UTILZE LA API DE RICKYANDMORTY P Y SOLO LO ADAPTE
   * 
   */

  async excecuteSeedMorty() {

     //borramos todo al ejecutar el seed
     await this.pokemonModel.deleteMany({});
     
     //const personajes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,42,44,45,46,47,48,49,50,51]
     
    //*HACEMOS LA CONSULTA A LA API PARA OBTENER 3 PERSONAJES
    const data = await this.http.get<RickmortyResponse>(`https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19`)
    //console.log(data.results);
    
// Supongamos que 'data' es un arreglo de personajes. Para acceder a las propiedades 'name' e 'id' de cada personaje:
    const characters = Array.isArray(data) ? data : [data]; // Asegurándonos de que 'data' sea un arreglo

    const characterInfo = [];

    characters.forEach((character) => {
      characterInfo.push({
        no: character.id,
        name: character.name,
      });
    });

    const charactersbd = await this.pokemonModel.create(characterInfo);

    console.log(characterInfo);

    return 'Seed Executed';
          
  
  }


}
