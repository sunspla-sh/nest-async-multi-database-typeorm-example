import { TestingModule, Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { DogsService } from './dogs.service';
import { Repository } from 'typeorm';
import { Dog } from './dog.entity';

describe('Dogs Service', () => {
  let dogsService: DogsService;
  let dogsRepository: Repository<Dog>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [DogsService],
    })
      .useMocker(createMock)
      .compile();
    dogsService = moduleRef.get<DogsService>(DogsService);
  });

  it('should be defined', () => {
    console.log(dogsService);
    expect(dogsService).toBeDefined();
  });
});
