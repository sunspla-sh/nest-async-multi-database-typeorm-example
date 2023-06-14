import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validate, EnvironmentVariables } from './env.validate';
import { CatsModule } from './cats/cats.module';
import { Cat } from './cats/cat.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: 'catsConnection',
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        type: 'mysql',
        host: configService.get('MYSQL_DB_HOST'),
        port: configService.get('MYSQL_DB_PORT'),
        username: configService.get('MYSQL_DB_USERNAME'),
        password: configService.get('MYSQL_DB_PASSWORD'),
        database: configService.get('MYSQL_DB_NAME'),
        synchronize: true,
        entities: [Cat],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: 'dogsConnection',
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        type: 'better-sqlite3',
        database: configService.get('SQLITE_DB_NAME'),
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
