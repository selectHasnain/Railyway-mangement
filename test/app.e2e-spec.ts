import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
describe("/get-user Get",()=>{
  it('get all users', () => {
let response = request(app.getHttpServer())
    .get('/get-user')
    .send({})

    expect(response).toBe(201)
  })
    });
      });
