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


    //fixture.detectChanges();

 

    fixture.whenStable().then( () =>{
      
      // define variables for every required HTML element in the form
      const titleInput = fixture.debugElement.query(By.css("#title")).nativeElement;
      const descriptionInput = fixture.debugElement.query(By.css("#description")).nativeElement;
      const prioritySelect = fixture.debugElement.query(By.css("#priority")).nativeElement;
      const reporterSelect = fixture.debugElement.query(By.css("#reporter")).nativeElement;
      const statusSelect = fixture.debugElement.query(By.css("#status")).nativeElement;

      // set the values for the input fields
      titleInput.value = 'tessssttt';
      descriptionInput.value = 'testt';
      titleInput.dispatchEvent(new Event('input'));
      descriptionInput.dispatchEvent(new Event('input'));


      // set the values for select options
      // REMEMBER [0] is null!!
      prioritySelect.value = prioritySelect.options[2].value; // selected Major priority
      reporterSelect.value = reporterSelect.options[2].value; // PO
      statusSelect.value = statusSelect.options[1].value;     // Done

      // trigger change state
      prioritySelect.dispatchEvent(new Event('change'));
      reporterSelect.dispatchEvent(new Event('change'));
      statusSelect.dispatchEvent(new Event('change'));

      // detect all changes happened to the form
      fixture.detectChanges();

      // verify button state
      const buttonState = fixture.debugElement.query(By.css("button[type=submit]")).nativeElement.disabled;
      console.log("button is: "+buttonState);
    
      expect(buttonState).toEqual(false);
    });

   });

});
