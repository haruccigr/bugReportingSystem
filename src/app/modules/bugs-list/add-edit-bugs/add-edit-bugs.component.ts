import { Component, OnInit, Input } from '@angular/core';
import { Bugs, Comment } from '../bugs.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEditBugsService } from '../add-edit-bugs.service';
import { BugsListService } from '../bugs-list.service';
import { GlobalsService } from '../globals.service';


@Component({
  selector: 'bugReporting-add-edit-bugs',
  templateUrl: './add-edit-bugs.component.html',
  styleUrls: ['./add-edit-bugs.component.css']
})

export class AddEditBugsComponent implements OnInit {

  bug: Bugs = {
    title: '',
    description: '',
    priority: null,
    reporter: null,
    status: null,
    createdAt: new Date(),
    id: '',
    comments: []
  };

  addedComment: Comment;
  mode: string;
  hideAddNotification = true;   // add success notification
  removeAddNotification = true;

  addPostFlag = false;          // disables the submit button after the add
  editPostFlag = false;         // a flag for an Edit submit. When true a notification that an
  // an edit occured appears. Also used to disable the button after
  // the edit to prevent duplicated entries

  priorities = ['Minor', 'Major', 'Critical'];
  reporter = ['QA', 'PO', 'DEV'];
  status = ['Ready for test', 'Done', 'Rejected'];

  selectedPriority = null;      // used to save user input priority (which is a string)

  constructor(private _route: ActivatedRoute, private _addEditBugsService: AddEditBugsService,
    private _bugsListService: BugsListService, private _next_route: Router, private globals: GlobalsService) {
  }

  /**
   * 
   * Takes no arguments.
   * 
   * @returns nothing. It is the init function of the component.
   *          if the mode is on edit, it fetches the data from the
   *          database and prefills the inputs with it.
   * 
   */

  ngOnInit() {
    // set the mode based on id's existence in the url
    let id = this._route.snapshot.params.id;

    if (id === undefined) { //add mode
      this.mode = "add";
    }
    else { //edit mode
      this.mode = "edit";

      // init addedComment to whitespace
      this.addedComment = { reporter: '', description: '' };

      this._addEditBugsService.getBugById(id).subscribe(data => {
        // Cast priority from number to the 3 available options
        this.selectedPriority = this.priorityToString(data.priority);
        //get data
        this.bug = data;
        if (this.bug.comments === null) {
          this.bug.comments = [];
        }

      });

    }
  }


  /**
  * 
  * @param priority. the priority value as a number from the server
  * 
  * @returns Minor if the number is 1, Major if the number is 2 and Critical
  *          in any other case.
  * 
  */

  priorityToString(priority: number): string {
    //Cast priority
    if (priority === 1) {
      console.log("Minor");
      return this.priorities[0];

    }
    else if (priority === 2) {
      console.log("Major");
      return this.priorities[1];

    }
    else if (priority === 3) {
      console.log("Critical");
      return this.priorities[2];
    }
    else {
      console.log("Priority > 3");
      console.log(priority);
      return this.priorities[2];

    }
  }


  /**
  * 
  * @param priority. the priority value as a string from the form
  * 
  * @returns 1 if the value is Minor, 2 if the value is Major and
  *          3 in any other case.
  * 
  */


  priorityToNumber(priority: string): number {
    // string to number
    if (priority === "Minor") {
      return 1;
    } else if (priority === "Major") {
      return 2;
    } else { // it is Critical
      return 3;
    }

  }

  /**
  * 
  * Takes no arguments.
  * 
  * @returns nothing. Calls the addEditService so as to post/put to the server
  *          when the mode is add or edit respectively.
  * 
  */

  submitForm() { 

    // set the right priority
    this.bug.priority = this.priorityToNumber(this.selectedPriority);

    // POST A NEW BUG
    if (this.mode === "add") {
      //console.log(this.bug);
      this._addEditBugsService.postBug(this.bug).subscribe();

      // success notification
      this.hideAddNotification = false;
      this.removeAddNotification = false;

      this.addPostFlag = true;

      //redirect to home
      setTimeout(() => {
        this.removeAddNotification = true; // palio flag
        this._next_route.navigate(['']);
      }, 5000);
    }
    else { // UPDATE AN EXISTING BUG

      // get the id 
      let id = this._route.snapshot.params.id;

      // comment validation
      if (this.bug.reporter != 'QA' && this.addedComment.description.trim() != '' && this.addedComment.reporter.trim() != ''
        && this.addedComment.description.trim() != null && this.addedComment.reporter.trim() != null) {

        // push new comment since it's not blank
        this.bug.comments = [...this.bug.comments, { ...this.addedComment }];
      }
      console.log(this.bug);
      this._addEditBugsService.putBug(id, this.bug).subscribe();

      // set the flag for the Edit notification
      this.editPostFlag = true;

      setTimeout(() => {
        this.editPostFlag = false;
        window.location.reload();
      }, 5000);

    }

  }

  /**
  * 
  * Takes no arguments.
  * 
  * @returns nothing. Hides the add bug successfully notification
  * 
  */

  hideNot() {
    this.hideAddNotification = true;
    setTimeout(() => {
      this.removeAddNotification = true;
      //this._next_route.navigate(['']);
    }, 2000);
  }


  /**
  * 
  * Takes no arguments.
  * 
  * @returns nothing. It resets the variables binded to the advanced search.
  *          Basically, an auxiliary method, only used for unit testing.
  * 
  */


  resetForm(): void {
    this.bug = {
      title: '',
      description: '',
      priority: null,
      reporter: null,
      status: null,
      createdAt: new Date(),
      id: '',
      comments: []
    };

    this.addedComment = { reporter: '', description: '' };

  }
}
