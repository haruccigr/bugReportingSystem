import { Component, OnInit, Input } from '@angular/core';
import {Bugs,Comment} from '../bugs.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEditBugsService } from '../add-edit-bugs.service';
import { BugsListService } from '../bugs-list.service';


@Component({
  selector: 'bugReporting-add-edit-bugs',
  templateUrl: './add-edit-bugs.component.html',
  styleUrls: ['./add-edit-bugs.component.css']
})

export class AddEditBugsComponent implements OnInit {

  bug: Bugs={ title: '',
              description: '',
              priority: null,
              reporter: null,
              status: null,
              createdAt: new Date(),
              id:'',
              comments: []
            };

  addedComment: Comment;
  mode: string;
  hideAddNotification = true;   // add success notification
  removeAddNotification = true;

  editPostFlag = false;

  priorities = ['Minor','Major','Critical'];
  reporter = ['QA','PO','DEV'];
  status = ['Ready for test','Done','Rejected'];

  selectedPriority = null;      // used to save user input priority (which is a string)
  
  constructor(private _route: ActivatedRoute, private _addEditBugsService: AddEditBugsService,
    private _bugsListService: BugsListService, private _next_route: Router) { 
  }

  ngOnInit() {
    // set the mode based on id's existence in the url
    let id = this._route.snapshot.params.id;

    if(id === undefined){ //add mode
      this.mode = "add";
    }
    else{ //edit mode
      this.mode = "edit";

      // init addedComment to whitespace
      this.addedComment = {reporter: '',description: ''};

      this._addEditBugsService.getBugById(id).subscribe(data =>{
      // Cast priority from number to the 3 available options
      this.selectedPriority = this.priorityToString(data.priority);
      //get data
      this.bug = data;

      });
       
    }
  }

  priorityToString(priority: number): string{
    //Cast priority
    if(priority === 1){ 
      console.log("Minor");
      return this.priorities[0];
      
    }
    else if(priority ===2){
      console.log("Major");
      return this.priorities[1];
      
    }
    else if (priority === 3){
      console.log("Critical");
      return this.priorities[2];
    }
    else {
      console.log("Priority > 3");
      console.log(priority);
      return this.priorities[2];

    }
  }

  priorityToNumber(priority: string): number{
        // string to number
        if(priority === "Minor"){
          return 1;
        }else if( priority === "Major"){
          return 2;
        }else{ // it is Critical
          return 3;
        }
 
  }

  submitForm(){ // add or edit a bug

    // set the right priority
    this.bug.priority = this.priorityToNumber(this.selectedPriority);

    // POST A NEW BUG
    if(this.mode === "add"){
      console.log(this.bug);
      this._addEditBugsService.postBug(this.bug).subscribe();

      // success notification
      this.hideAddNotification = false;
      this.removeAddNotification = false;

      //redirect to home
      setTimeout(()=> {
        this.removeAddNotification = true; // palio flag
        this._next_route.navigate(['']);
     } ,5000);
    }
    else{ // UPDATE AN EXISTING BUG

      //get the id 
      let id = this._route.snapshot.params.id;
    
      // comment validation
      if(this.bug.reporter != 'QA' && this.addedComment.description.trim() != ''  && this.addedComment.reporter.trim() != ''
      && this.addedComment.description.trim() != null && this.addedComment.reporter.trim() != null){
        
        // push new comment since it's not blank
        this.bug.comments = [...this.bug.comments, {...this.addedComment}];
      }
      console.log(this.bug);
      this._addEditBugsService.putBug(id,this.bug).subscribe();
      this.editPostFlag = true;

      setTimeout(()=> {
        this.editPostFlag = false;
        window.location.reload();
        //this._next_route.navigate(['edit/'+this._route.snapshot.params.id]);
     } ,5000);

    }
    //window.location.reload();
    //this._next_route.navigate(['edit/'+this._route.snapshot.params.id]);
    //this._next_route.navigate(['']);
  }

  // hides add notification
  hideNot(){
    this.hideAddNotification = true;
   setTimeout(()=> {
     this.removeAddNotification = true;
     //this._next_route.navigate(['']);
  } ,2000);
  }


  resetForm():void{
    this.bug={ title: '',
              description: '',
              priority: null,
              reporter: null,
              status: null,
              createdAt: new Date(),
              id:'',
              comments: []
            };

  this.addedComment = {reporter: '',description: ''};

  }
}
