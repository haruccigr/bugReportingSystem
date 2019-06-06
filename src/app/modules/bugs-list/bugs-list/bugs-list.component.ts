import { Component, OnInit } from '@angular/core';
import { BugsListService} from '../bugs-list.service';
import {Bugs,sortType,SortBy} from '../bugs.model';
//import { AddEditModeService } from '../add-edit-mode.service';


@Component({
  selector: 'bugReportingSystem-bugs-list',
  templateUrl: './bugs-list.component.html',
  styleUrls: ['./bugs-list.component.css']
})
export class BugsListComponent implements OnInit {

  bugsList: Bugs[];
  sortBy: SortBy;
  
  constructor(private bugsListService: BugsListService) { }

  ngOnInit() {

    // init sortBy
    this.sortBy = {value: "",order: sortType.default};

    //get table data
    this.bugsListService.getBugsList(this.sortBy).subscribe( data => this.bugsList = data);
    
  }

  /**
   * 
   * @param event the click event that trigerred the function call
   * 
   * @returns nothing; stores the bugs list fetched from the service
   * into the bugsList property
   * 
   * Convension: By default the first sort will be descending.
   */

  sort(event): void{

    // ckeck sortBy status
    if(this.sortBy.order === sortType.default || this.sortBy.order === sortType.asc){
      this.sortBy.order = sortType.desc;
    }
    else { // it is desc, so change it to asc
      this.sortBy.order = sortType.asc;
    }

    // check the value by which the sort will take place
    switch(event.target.id){
      case "title":{
        this.sortBy.value = "title";
        break;
      }
      case "priority":{
        this.sortBy.value = "priority";
        break;
      }
      case "reporter":{
        this.sortBy.value = "reporter";
        break;
      }
      case "createdAt":{
        this.sortBy.value = "createdAt";
        break;
      }
      case "status":{
        this.sortBy.value = "status";
        break;
      }
      default: {
        console.log("SWITCH ERROR");
      }
    }
    
    this.bugsListService.getBugsList(this.sortBy).subscribe( data => this.bugsList = data);
  }
/*
  edit(id){
    console.log(id);
    this._addEditModeService.addEditMode = "edit";
  }
*/
}
