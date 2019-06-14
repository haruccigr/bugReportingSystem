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
  currentPage: number;
  titleInput: string;
  priorityInput: string ;
  reporterInput: string;
  statusInput: string;
  searchFlag: boolean;
  totalPages: string;
  
  constructor(private bugsListService: BugsListService) { }

  ngOnInit() {

    // init properties
    this.currentPage = 0;
    this.titleInput = "";
    this.priorityInput = null;
    this.reporterInput = null;
    this.statusInput = null;
    this.searchFlag = false;
    this.sortBy = {value: "",order: sortType.default};

    //get table data
    this.bugsListService.getBugsList(this.sortBy, this.currentPage)
    .subscribe( resp => {
      this.bugsList = resp.body;
      this.totalPages = resp.headers.get('Totalpages');
    });
    
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

  sort(val: string): void{

    this.sortBy.value = val;

    // ckeck sortBy status
    if(this.sortBy.order === sortType.default || this.sortBy.order === sortType.asc){
      this.sortBy.order = sortType.desc;
    }
    else { // it is desc, so change it to asc
      this.sortBy.order = sortType.asc;
    }

    // check if the user makes a search
   
    if(!this.searchFlag){
      this.bugsListService.getBugsList(this.sortBy, this.currentPage)
      .subscribe( resp => {      
        this.bugsList = resp.body;
        this.totalPages = resp.headers.get('Totalpages');});
    }else{
      this.bugsListService.searchBugsList(this.sortBy, this.currentPage, this.titleInput, this.priorityInput, this.reporterInput, this.statusInput).subscribe(resp =>{
        //this.currentPage = 0;       // Must display the first page after a search
        this.bugsList = resp.body;
        this.totalPages = resp.headers.get('Totalpages');
      });
    }
 
  }

  navigate(action: string): void{
    console.log("KLISI NAVIGATE"+this.currentPage);
    if(action === "next"){
      if(!this.searchFlag){
      
        this.bugsListService.getBugsList(this.sortBy,this.currentPage+1).subscribe(resp =>{
           if(resp.body.length){
             this.bugsList = resp.body;
             this.totalPages = resp.headers.get('Totalpages');
             this.currentPage++;
           }
         });
      }
      else{
        this.bugsListService.searchBugsList(this.sortBy, this.currentPage+1, this.titleInput, this.priorityInput, this.reporterInput, this.statusInput)
        .subscribe(resp =>{
          console.log("KLISI SEARCH"+this.currentPage);
           if(resp.body.length){
            //this.currentPage = 0;     // Must display the first page after a search
            this.bugsList = resp.body;
            this.totalPages = resp.headers.get('Totalpages');
            this.currentPage++;
           }
         });
      }



    }else if(action === "previous" && this.currentPage){

      if(!this.searchFlag){
        this.bugsListService.getBugsList(this.sortBy,this.currentPage-1).subscribe(resp =>{
           if(resp.body.length){
            this.bugsList = resp.body;
            this.totalPages = resp.headers.get('Totalpages');
             this.currentPage--;
           }
         });
      }
      else{
        this.bugsListService.searchBugsList(this.sortBy, this.currentPage-1, this.titleInput, this.priorityInput, this.reporterInput, this.statusInput)
        .subscribe( resp =>{
           if(resp.body.length){
            //this.currentPage = 0;       // Must display the first page after a search
            this.bugsList = resp.body;
            this.totalPages = resp.headers.get('Totalpages');
            this.currentPage--;
           }
         });
      }
    }
  }

  search(): void{
    this.searchFlag= true;
    this.currentPage = 0; // Must display the first page after a search
    this.bugsListService.searchBugsList(this.sortBy, this.currentPage, this.titleInput, this.priorityInput, this.reporterInput, this.statusInput)
    .subscribe( resp =>{
      
      this.bugsList = resp.body;
      this.totalPages = resp.headers.get('Totalpages');
    });
  }

  resetSearch(): void{
    this.titleInput = "";
    this.priorityInput = null;
    this.reporterInput = null;
    this.statusInput = null;
    this.searchFlag = false;
  }

  deleteBugs(event){
    //console.log("mpampas"+event);

    // DELETE
    this.bugsListService.deleteById(event).subscribe( ()=> {

      

    //  GET THE NEW LIST
      if(!this.searchFlag){
        this.bugsListService.getBugsList(this.sortBy, this.currentPage)
        .subscribe( resp => {  
    
          this.bugsList = resp.body;
          this.totalPages = resp.headers.get('Totalpages');

          // check if the item deleted was on the last page
          // if it's true we must go back a page, and load those bugs
          if(this.currentPage.toString() == this.totalPages){ 
            this.currentPage--;
            this.bugsListService.getBugsList(this.sortBy, this.currentPage)
             .subscribe( resp => {
                this.bugsList = resp.body;
                //this.totalPages = resp.headers.get('Totalpages');
              });
          }
          
        });
      }else{
        this.bugsListService.searchBugsList(this.sortBy, this.currentPage, this.titleInput, this.priorityInput, this.reporterInput, this.statusInput).subscribe(resp =>{

          this.bugsList = resp.body;
          this.totalPages = resp.headers.get('Totalpages');

          // check if the item deleted was on the last page
          // if it's true we must go back a page, and load those bugs
          if(this.currentPage.toString() == this.totalPages){ 
            this.currentPage--;
            this.bugsListService.searchBugsList(this.sortBy, this.currentPage, this.titleInput, this.priorityInput, this.reporterInput, this.statusInput)
             .subscribe( resp => {
                this.bugsList = resp.body;
                //this.totalPages = resp.headers.get('Totalpages');
              });
          }

        });
      }
    });
    

  }

}
