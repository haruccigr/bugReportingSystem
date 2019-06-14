import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BugsListComponent } from './bugs-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { DeleteBugsComponent } from '../delete-bugs/delete-bugs.component';
import { HttpClientModule } from '@angular/common/http';

describe('BugsListComponent', () => {
  let component: BugsListComponent;
  let fixture: ComponentFixture<BugsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule,HttpClientModule],
      declarations: [ BugsListComponent, DeleteBugsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
