import { TestBed } from '@angular/core/testing';
import { HttpClientModule} from '@angular/common/http';

import { BugsListService } from './bugs-list.service';

describe('BugsListService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: BugsListService = TestBed.get(BugsListService);
    expect(service).toBeTruthy();
  });
});
