import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dog } from './dog.entity';
import { SQLITE_TYPEORM_DATASOURCE_NAME } from '../constants';
import { CreateDogDto } from './create-dog.dto';

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(Dog, SQLITE_TYPEORM_DATASOURCE_NAME)
    private dogsRepository: Repository<Dog>,
  ) {}

  findAll(): Promise<Dog[]> {
    return this.dogsRepository.find();
  }

  create(createDogDto: CreateDogDto): Promise<Dog> {
    const dog = new Dog();
    dog.name = createDogDto.name;
    dog.breed = createDogDto.breed;

    return this.dogsRepository.save(dog);
  }

  async remove(id: number): Promise<void> {
    await this.dogsRepository.delete(id);
  }
}
