import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { CatsModule } from '../src/cats/cats.module';
import { Cat } from '../src/cats/cat.entity';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMock } from '@golevelup/ts-jest';
import { Repository } from 'typeorm';
import { CreateCatDto } from '../src/cats/create-cat.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('Cats', () => {
  let app: INestApplication;
  const globalValidationPipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  });
  const fakeCats: Cat[] = [
    {
      id: 1,
      name: 'bob the cat',
      age: 4,
      async validate() {
        return;
      },
    },
    {
      id: 2,
      name: 'jim the cat',
      age: 6,
      async validate() {
        return;
      },
    },
  ];

  const fakeSerializedCats = JSON.parse(JSON.stringify(fakeCats));

  const fakeCreateCatDto: CreateCatDto = {
    name: 'freddy the cat',
    age: 3,
  };

  const fakeCreatedCat: Cat = {
    id: 4,
    name: fakeCreateCatDto.name,
    age: fakeCreateCatDto.age,
    async validate() {
      return;
    },
  };

  const fakeCreatedSerializedCat = JSON.parse(JSON.stringify(fakeCreatedCat));

  beforeEach(async () => {
    /**
     * Create mock cats repository (so that we don't actually need to connect to database)
     */
    const mockCatsRepository = createMock<Repository<Cat>>();
    /**
     * Mock .find() method which is used by CatsService for the GET request
     */
    mockCatsRepository.find.mockResolvedValue(fakeCats);
    /**
     * Mock .create() method which is used by CatsService for the POST request.
     * This should resolve to a newly created Cat (including methods, which
     * will be stripped later during serialization before sending response)
     */
    mockCatsRepository.save.mockResolvedValue(fakeCreatedCat);
    /**
     * Mock .remove() method which is used by CatsService for the DELETE request
     */
    const CatsRepositoryToken = getRepositoryToken(Cat, 'catsConnection');

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [CatsModule],
    })
      .overrideProvider(CatsRepositoryToken)
      .useValue(mockCatsRepository)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(globalValidationPipe);
    await app.init();
  });

  it('/GET cats', () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect(fakeSerializedCats);
  });

  describe('/POST cats', () => {
    it('valid input', () => {
      return request(app.getHttpServer())
        .post('/cats')
        .send(fakeCreateCatDto)
        .expect(201)
        .expect(fakeCreatedSerializedCat);
    });

    it('invalid input', async () => {
      const invalidInput = { junk: 'data' };

      let validationError;

      try {
        //transform junk data with the expectation of failure and bad request error
        await globalValidationPipe.transform(
          { junk: 'data' },
          { type: 'body', metatype: CreateCatDto, data: undefined },
        );
      } catch (err) {
        //capture bad request error response for later comparison
        validationError = err.response;
      }

      // const invalidCreateCatDto = plainToInstance(CreateCatDto, invalidInput);
      // const errors = await validate(invalidCreateCatDto);

      return request(app.getHttpServer())
        .post('/cats')
        .send(invalidInput)
        .expect(400)
        .expect((response: request.Response) => {
          //compare response body to the expected bad request error response that we previously captured
          expect(response.body).toEqual(validationError);
        });
    });
  });

  it('/DELETE cats', () => {
    return request(app.getHttpServer()).delete('/cats/3').expect(200);
  });

  afterEach(async () => {
    await app.close();
  });
});
