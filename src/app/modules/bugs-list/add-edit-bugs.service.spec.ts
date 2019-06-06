import { TestBed } from '@angular/core/testing';

import { AddEditBugsService } from './add-edit-bugs.service';

describe('AddEditBugsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddEditBugsService = TestBed.get(AddEditBugsService);
    expect(service).toBeTruthy();
  });
});
