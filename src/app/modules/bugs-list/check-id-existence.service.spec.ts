import { TestBed } from '@angular/core/testing';

import { CheckIdExistenceService } from './check-id-existence.service';

describe('CheckIdExistenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckIdExistenceService = TestBed.get(CheckIdExistenceService);
    expect(service).toBeTruthy();
  });
});
