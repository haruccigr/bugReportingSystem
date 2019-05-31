import { TestBed } from '@angular/core/testing';

import { BugsListServiceService } from './bugs-list-service.service';

describe('BugsListServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BugsListServiceService = TestBed.get(BugsListServiceService);
    expect(service).toBeTruthy();
  });
});
