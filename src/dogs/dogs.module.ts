import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SQLITE_TYPEORM_DATASOURCE_NAME } from '../constants';
import { Dog } from './dog.entity';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dog], SQLITE_TYPEORM_DATASOURCE_NAME)],
  controllers: [DogsController],
  providers: [DogsService],
})
export class DogsModule {}
