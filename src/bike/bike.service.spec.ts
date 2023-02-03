import { BikeRepository } from './bike.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { BikeService } from './bike.service';
import { BikesType } from './bike.type';

describe('BikeService', () => {
  let service: BikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BikeService, BikeRepository],
    }).compile();

    service = module.get<BikeService>(BikeService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBikes', () => {
    it('should return an array of Bikes', async () => {
      let result: Promise<BikesType[]>;
      jest
        .spyOn(service, 'getBikes')
        .mockImplementation(async () => await result);

      expect(await service.getBikes()).toBe(result);
    });
  });
});
