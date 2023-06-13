import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './env.validate';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const configService: ConfigService<EnvironmentVariables> =
    app.get(ConfigService);
  const APP_PORT = configService.get('APP_PORT');
  await app.listen(APP_PORT);
}
bootstrap();
