import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cat], 'catsConnection')],
  providers: [CatsService],
  controllers: [CatsController],
})
export class CatsModule {}
