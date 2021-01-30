import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { SpacexService } from './spacex.service';

describe('SpacexService', () => {
  let service: SpacexService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpacexService]
    });
    service = TestBed.inject(SpacexService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`API_BASE_URL has default value`, () => {
    expect(service.API_BASE_URL).toEqual(
      `https://api.spaceXdata.com/v3/launches?limit=100`
    );
  });
});
