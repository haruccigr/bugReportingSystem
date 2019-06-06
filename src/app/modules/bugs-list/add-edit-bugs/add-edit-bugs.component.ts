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
              reporter: '',
              status:'',
              createdAt: new Date(),
              id:'',
              comments: []
            };

  addedComment: Comment;
  mode: string;

  priorities = ['Minor','Major','Critical'];
  reporter = ['QA','PO','DEV'];
  status = ['Ready for test','Done','Rejected'];

  selectedPriority;
  
  constructor(private _route: ActivatedRoute, private _addEditBugsService: AddEditBugsService,
    private _bugsListService: BugsListService, private _next_route: Router) { 
  }

  ngOnInit() {
    // set the mode and init bug
    let id = this._route.snapshot.params.id;

    if(id === undefined){ //add mode
      this.mode = "add";
    }
    else{ //edit mode
      this.mode = "edit";

      this.addedComment = {reporter: '',description: ''};

      this._addEditBugsService.getBugById(id).subscribe(data =>{
        //Cast priority
        if(data.priority === 1){ 
          this.selectedPriority = this.priorities[0];
          console.log("Minor");
        }
        else if(data.priority ===2){
          this.selectedPriority = this.priorities[1];
          console.log("Major");
        }
        else if (data.priority === 3){
          this.selectedPriority = this.priorities[2];
          console.log("Critical");
        }
        else {
          this.selectedPriority = this.priorities[2];
          console.log("Priority > 3");
          console.log(data.priority);
        }
        this.bug = data;
        //console.log(data.comments);
      });
       
    }
  }

  submitForm(data){ // add a new bug

    // string to number
    if(data.priority === "Minor"){
      data.priority = 1;
    }else if( data.priority === "Major"){
      data.priority = 2;
    }else{ // it is Critical
      data.priority = 3;
    }

    // POST A NEW BUG
    if(this.mode === "add"){
      this._addEditBugsService.postBug(data).subscribe();
    }
    else{ // UPDATE AN EXISTING BUG

      //get the id 
      let id = this._route.snapshot.params.id;
      let newData;
      if(this.bug.reporter != 'QA'){
        newData = {
          title: data.title,
          description: data.description,
          priority: data.priority,
          reporter: data.reporter,
          status: data.status,
          comments:[...this.bug.comments,{reporter: data.commentReporter, description: data.commentDescription}]
        };
        console.log(newData);
        
      }
      this._addEditBugsService.putBug(id,newData).subscribe();
    }
    this._next_route.navigate(['']);
  }


}
