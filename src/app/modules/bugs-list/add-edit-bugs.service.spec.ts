import { TestBed, async } from '@angular/core/testing';

import { AddEditBugsService } from './add-edit-bugs.service';
import { HttpClientModule } from '@angular/common/http';

describe('AddEditBugsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
  });


  
  it('should be created', () => {
    const service: AddEditBugsService = TestBed.get(AddEditBugsService);
    expect(service).toBeTruthy();
  });
});
