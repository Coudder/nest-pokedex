import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {

  
  transform(value: string, metadata: ArgumentMetadata) {
    
   // console.log({value, metadata});
    
   if( !isValidObjectId(value) ){
    throw new BadRequestException(`invalid MongoID: ${value}`);
   }
    
    return value;
  }
}



//*PIPE PERSONALIZADO PARA QUE SOLO ACEPTE MONGO ID ESTE LO SUAMOS AL MOMENTO DE ELIMINAR