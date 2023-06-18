import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cat.entity';
import { MYSQL_TYPEORM_DATASOURCE_NAME } from '../constants';

@Module({
  imports: [TypeOrmModule.forFeature([Cat], MYSQL_TYPEORM_DATASOURCE_NAME)],
  providers: [CatsService],
  controllers: [CatsController],
})
export class CatsModule {}
