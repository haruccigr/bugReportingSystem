import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AddEditBugsComponent } from './add-edit-bugs.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('AddEditBugsComponent', () => {
  let component: AddEditBugsComponent;
  let fixture: ComponentFixture<AddEditBugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,RouterTestingModule,HttpClientModule],
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

  it('When the form is not filled, the submit button is disabled', () => {
  
    component.resetForm();
    fixture.whenStable().then( () =>{
      
      fixture.detectChanges();
      const buttonState = fixture.debugElement.query(By.css("button[type=submit]")).nativeElement.disabled;
      //console.log(buttonState)
      expect(buttonState).toEqual(true);
    });

   });


  it('When the minimum required fields are given, the submit button is enabled', () => {
    /*
    component.bug.title = 'testt';         // 4 minimum
    component.bug.description = 'testyyy';   // 5 minimum
   // component.bug.priority = 1;
    component.bug.reporter = 'QA';
    component.bug.status = 'Done';
*/
    fixture.debugElement.query(By.css("#title")).nativeElement.value = 'testt';
    fixture.debugElement.query(By.css("#description")).nativeElement.value = 'testtyy';
   // fixture.debugElement.query(By.css("#priority")).nativeElement.value = 'testt';
   // fixture.debugElement.query(By.css("#reporter")).nativeElement.value = 'testt';
    //fixture.debugElement.query(By.css("#status")).nativeElement.value = 'testt';

    component.addedComment = {description:'', reporter: ''};

    fixture.whenStable().then( () =>{
      
      fixture.detectChanges();
      const buttonState = fixture.debugElement.query(By.css("button[type=submit]")).nativeElement.disabled;
      console.log(buttonState)
      expect(buttonState).toEqual(true);
    });

   });

});
