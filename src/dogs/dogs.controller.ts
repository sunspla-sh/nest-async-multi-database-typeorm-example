import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './create-dog.dto';

@Controller('dogs')
export class DogsController {
  constructor(private dogsService: DogsService) {}

  @Get()
  findAll() {
    return this.dogsService.findAll();
  }

  @Post()
  create(@Body() createDogDto: CreateDogDto) {
    return this.dogsService.create(createDogDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dogsService.remove(id);
  }
}
