import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CheckIdExistenceService } from './check-id-existence.service';
import { HttpClientModule } from '@angular/common/http';

describe('CheckIdExistenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientModule]
    })
    .compileComponents();
  }));
  
  it('should be created', () => {
    const service: CheckIdExistenceService = TestBed.get(CheckIdExistenceService);
    expect(service).toBeTruthy();
  });
});
