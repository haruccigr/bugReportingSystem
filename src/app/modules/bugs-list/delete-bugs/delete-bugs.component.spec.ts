import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBugsComponent } from './delete-bugs.component';

describe('DeleteBugsComponent', () => {
  let component: DeleteBugsComponent;
  let fixture: ComponentFixture<DeleteBugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBugsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
