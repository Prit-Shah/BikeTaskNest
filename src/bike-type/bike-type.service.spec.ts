import { Test, TestingModule } from '@nestjs/testing';
import { BikeTypeService } from './bike-type.service';

describe('BikeTypeService', () => {
  let service: BikeTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BikeTypeService],
    }).compile();

    service = module.get<BikeTypeService>(BikeTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
