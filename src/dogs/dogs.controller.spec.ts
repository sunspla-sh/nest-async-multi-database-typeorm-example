import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { TestingModule, Test } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Dog } from './dog.entity';
import { CreateDogDto } from './create-dog.dto';

describe('DogsController', () => {
  let dogsController: DogsController;
  let dogsService: DeepMocked<DogsService>;
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [DogsController],
    })
      .useMocker(createMock)
      .compile();

    dogsController = moduleRef.get<DogsController>(DogsController);
    dogsService = moduleRef.get(DogsService);
  });

  it('should be defined', () => {
    expect(dogsController).toBeDefined();
  });

  it('should be an instance of class DogsController', () => {
    expect(dogsController).toBeInstanceOf(DogsController);
  });

  describe('findAll method', () => {
    it('should be defined', () => {
      expect(dogsController.findAll).toEqual(expect.any(Function));
    });

    it('should return an array of dogs if promise resolves', async () => {
      const firstTestDog = new Dog();
      firstTestDog.id = 1;
      firstTestDog.name = 'spot';
      firstTestDog.breed = 'mutt';
      const secondTestDog = new Dog();
      secondTestDog.id = 2;
      secondTestDog.name = 'lassie';
      secondTestDog.breed = 'collie';
      const dogsArray = [firstTestDog, secondTestDog];

      dogsService.findAll.mockResolvedValue(dogsArray);

      await expect(dogsController.findAll()).resolves.toEqual(dogsArray);
    });

    it('should return error if promise rejects', async () => {
      const someErrorFromFailureOfDogsService = new Error();
      dogsService.findAll.mockRejectedValue(someErrorFromFailureOfDogsService);
      await expect(dogsController.findAll()).rejects.toEqual(
        someErrorFromFailureOfDogsService,
      );
    });
  });

  describe('create method', () => {
    it('should be defined', () => {
      expect(dogsController.create).toEqual(expect.any(Function));
    });
    it('should return a new dog if promise resolves', async () => {
      const testCreateDogDto = new CreateDogDto();
      testCreateDogDto.name = 'spot';
      testCreateDogDto.breed = 'mutt';

      const testDog = new Dog();
      testDog.id = 1;
      testDog.name = testCreateDogDto.name;
      testDog.breed = testCreateDogDto.breed;

      dogsService.create.mockResolvedValue(testDog);

      await expect(dogsController.create(testCreateDogDto)).resolves.toEqual(
        testDog,
      );
    });
    it('should return error if promise rejects', async () => {
      const someErrorFromFailureOfDogsService = new Error();
      dogsService.create.mockRejectedValue(someErrorFromFailureOfDogsService);
      await expect(dogsController.create(new CreateDogDto())).rejects.toEqual(
        someErrorFromFailureOfDogsService,
      );
    });
  });
});
