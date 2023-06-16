import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { Cat } from '../src/cats/cat.entity';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Cats', () => {
  let app: INestApplication;

  const catsRepository = { find: () => ['bob the cat'] };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(Cat, 'catsConnection'))
      .useValue(catsRepository)
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/GET cats', () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect(catsRepository.find());
  });

  afterEach(async () => {
    await app.close();
  });
});
