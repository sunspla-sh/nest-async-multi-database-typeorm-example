import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validate, EnvironmentVariables } from './env.validate';
import { CatsModule } from './cats/cats.module';
import { Cat } from './cats/cat.entity';
import {
  MYSQL_TYPEORM_DATASOURCE_NAME,
  SQLITE_TYPEORM_DATASOURCE_NAME,
} from './constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: MYSQL_TYPEORM_DATASOURCE_NAME,
      useFactory: (
        configService: ConfigService<EnvironmentVariables>,
      ): TypeOrmModuleOptions => ({
        name: MYSQL_TYPEORM_DATASOURCE_NAME,
        type: configService.get<TypeOrmModuleOptions>('MYSQL_DB_TYPE', {
          infer: true, //set infer type option to boolean true to make useFactory happy
        }),
        host: configService.get<string>('MYSQL_DB_HOST'),
        port: configService.get<number>('MYSQL_DB_PORT'),
        username: configService.get<string>('MYSQL_DB_USERNAME'),
        password: configService.get<string>('MYSQL_DB_PASSWORD'),
        database: configService.get<string>('MYSQL_DB_NAME'),
        synchronize: true,
        entities: [Cat],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: SQLITE_TYPEORM_DATASOURCE_NAME,
      useFactory: (
        configService: ConfigService<EnvironmentVariables>,
      ): TypeOrmModuleOptions => ({
        name: SQLITE_TYPEORM_DATASOURCE_NAME,
        type: configService.get<TypeOrmModuleOptions>('SQLITE_DB_TYPE', {
          infer: true, //set infer type option to boolean true to make useFactory happy
        }),
        database: configService.get<string>('SQLITE_DB_NAME'),
        synchronize: true,
        entities: [],
      }),
      inject: [ConfigService],
    }),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
