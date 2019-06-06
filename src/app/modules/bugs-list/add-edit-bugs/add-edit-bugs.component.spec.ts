import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBugsComponent } from './add-edit-bugs.component';

describe('AddEditBugsComponent', () => {
  let component: AddEditBugsComponent;
  let fixture: ComponentFixture<AddEditBugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditBugsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
