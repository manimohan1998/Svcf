import { TestBed } from '@angular/core/testing';

import { SubscriberApiService } from './subscriber-api.service';

describe('SubscriberApiService', () => {
  let service: SubscriberApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriberApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
