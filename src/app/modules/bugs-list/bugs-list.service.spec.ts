import { TestBed } from '@angular/core/testing';

import { BugsListService } from './bugs-list.service';

describe('BugsListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BugsListService = TestBed.get(BugsListService);
    expect(service).toBeTruthy();
  });
});
