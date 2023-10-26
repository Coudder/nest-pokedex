import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {


  constructor(
    //hacemos inyeccion de dependencia de nuestro model de nuestra entidad Pokemon
    @InjectModel( Pokemon.name ) //nombre del modelo osea la entidad
    private readonly pokemonModel: Model<Pokemon>
  ){}


  async create(createPokemonDto: CreatePokemonDto) {

    //* pasamos el nombre a minusculas
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    //* DENTRO DE UN TRY CATCH HACEMOS LA INSERCION
    try {
      
      //*GUARDAMOS EN NUESTRA COLECCION pokemonMode.accion de mongoose(creat, updatemany, delete etc)
      const pokemon = await this.pokemonModel.create( createPokemonDto );
  
  
      return pokemon;


    } catch (error) {
      console.log(error);
            
      
      this.handleExceptions(error);

      // //* SI NOS DA EL ERROR 11000 QUE ESTE LO SACAMOS DEL LOG ENTONCES ES ERROR DE VALOR UNICO 
      // if(error.code === 11000){
      //   throw new BadRequestException(`Pokemon exists in db ${ JSON.stringify(error.keyValue) }`)
      // } 
      // console.log(error);
      // throw new InternalServerErrorException(`Can't create Pokemon - Check Server Logs`) 
    }


  }

  //!REGRESA TODOS LOS POKEMONS
  findAll() {
    
     return this.pokemonModel.find(); 

  }

  //!ENCUNTRA UN POKEMON
   //* las busquedas seran por id mongoId y nombre de pokemon
  async findOne(term: string) {
    
    let pokemon: Pokemon //enttty

    // * SI ESTO ES UN NUMERO
    if( !isNaN(+term) ) {
        //pokemon es igual a la busqueda con nuestro modelo x el id
        pokemon = await this.pokemonModel.findOne({ no: term })
    }


    // mongoID
    //si no exist epokemon y es un mongoid
    if( !pokemon && isValidObjectId(term) ) {
       pokemon = await this.pokemonModel.findById(term);
    }

    //Busqueda x name
    if( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name:term.toLocaleLowerCase().trim() });
    }


    // si no se encuentra por ningun termino de busqueda
    if(!pokemon) throw new NotFoundException( `Pokemon with id, name or no ; "${term}" not found` )

    return pokemon;

  }

  //! ACTUALIZA UN POKEMON
  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    //utilizamos el metodo de findone para saber si encontramos un pokemon o no
    const pokemon = await this.findOne(term); 

    //si recibimos el nombre lo pasamos a minusculas
    if(updatePokemonDto.name) {
       updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    }

    try {
          // actualizamos en la base de datos
          //const pokemonUpdated = await pokemon.updateOne(updatePokemonDto, { new:true }); //true nos regresa el objeto actualizado
          await pokemon.updateOne(updatePokemonDto); //true nos regresa el objeto actualizado
      
               //esparcimos el pokemon.osjon y sobrescribimos el updatepokemondto
          return { ...pokemon.toJSON(), ...updatePokemonDto };
      
    } catch (error) {

      this.handleExceptions(error);
    
    }

    


  }

  //!ELIMINA UN POKEMON POR MONGO ID
  async remove(id: string) {


    //const result = await this.pokemonModel.findByIdAndDelete(id);


    //si no regresa deletecount = 0 quiee decir que ya no existe ese recuerso, desestructuramos 
    //lo hacemos asi para no ahcer dos consultas
    const { deletedCount } = await this.pokemonModel.deleteOne( { _id: id } );

    if(deletedCount === 0){
      throw new BadRequestException(`Pokemon with id: "${id} not found"`)
    }

    return {
      msg: 'Pokemon delete succesfully'
    };
    
    //buscamos el id
    //const pokemon = await this.findOne(id);

    // await pokemon.deleteOne();



  }


  //!MANEJO DE ERRORES 
  private handleExceptions(error:any) {

    if(error.code === 11000){
      throw new BadRequestException(`Pokemon exists in db ${ JSON.stringify(error.keyValue) }`)
    } 
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check Server Logs`) 
  

  }

}
