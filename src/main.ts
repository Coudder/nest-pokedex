import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2'); //agrega lo siguitente http://localhost:3000/api/v2/pokemon

  //*CONFIGURAMOS EL PIPE GLOBAL PARA VALIDACIONES
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted:true
    })
  )

  await app.listen(3000);
}
bootstrap();
