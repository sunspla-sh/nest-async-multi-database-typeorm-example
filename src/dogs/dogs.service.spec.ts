import { TestingModule, Test } from '@nestjs/testing';
import { DogsService } from './dogs.service';
import { Dog } from './dog.entity';
import { Repository, DeleteResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SQLITE_TYPEORM_DATASOURCE_NAME } from '../constants';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { CreateDogDto } from './create-dog.dto';

describe('DogsService', () => {
  let dogsService: DogsService;
  let dogsRepository: DeepMocked<Repository<Dog>>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        DogsService,
        {
          provide: getRepositoryToken(Dog, SQLITE_TYPEORM_DATASOURCE_NAME),
          useValue: createMock<Repository<Dog>>(),
        },
      ],
    }).compile();
    dogsService = moduleRef.get<DogsService>(DogsService);
    dogsRepository = moduleRef.get(
      getRepositoryToken(Dog, SQLITE_TYPEORM_DATASOURCE_NAME),
    );
  });

  it('should be defined', () => {
    expect(dogsService).toBeDefined();
  });

  it('should be instance of DogsService', () => {
    expect(dogsService).toBeInstanceOf(DogsService);
  });

  describe('findAll', () => {
    let testDogs: Dog[];

    it('should return an array of dogs if promise resolves', async () => {
      const firstTestDog = new Dog();
      firstTestDog.name = 'spot';
      firstTestDog.breed = 'mutt';
      firstTestDog.id = 1;
      const secondTestDog = new Dog();
      secondTestDog.name = 'lassie';
      secondTestDog.breed = 'collie';
      secondTestDog.id = 2;
      testDogs = [firstTestDog, secondTestDog];

      dogsRepository.find.mockResolvedValue(testDogs);

      await expect(dogsService.findAll()).resolves.toEqual(testDogs);
    });
  });

  describe('create', () => {
    it('should return a new dog', async () => {
      const createDogDto = new CreateDogDto();
      createDogDto.name = 'spot';
      createDogDto.breed = 'mutt';

      const testDog = new Dog();
      testDog.name = createDogDto.name;
      testDog.breed = createDogDto.breed;
      testDog.id = 1;

      dogsRepository.save.mockResolvedValue(testDog);

      await expect(dogsService.create(createDogDto)).resolves.toEqual(testDog);
    });
  });

  describe('remove', () => {
    it('should delete a dog by id', async () => {
      dogsRepository.delete.mockResolvedValue(new DeleteResult());
      dogsService.remove(1);
      expect(dogsRepository.delete).toBeCalled();
    });
  });
});
