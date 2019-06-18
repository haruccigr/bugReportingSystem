import { Component, OnInit } from '@angular/core';
import { BugsListService } from '../bugs-list.service';
import { Bugs, sortType, SortBy } from '../bugs.model';
import { GlobalsService } from '../globals.service';
//import { AddEditModeService } from '../add-edit-mode.service';


@Component({
  selector: 'bugReportingSystem-bugs-list',
  templateUrl: './bugs-list.component.html',
  styleUrls: ['./bugs-list.component.css']
})
export class BugsListComponent implements OnInit {

  bugsList: Bugs[];                 // stores the bugs loaded from the service
  sortBy: SortBy;                   // stores the sorting status
  currentPage: number;              // the current viewing page
  titleInput: string;               // title input in advanced search
  priorityInput: string;            // priority input in advanced search
  reporterInput: string;            // reporter input in advanced search
  statusInput: string;              // status input in advanced search
  searchFlag: boolean;              // a flag triggered when the user searches for something
  totalPages: string;               // the total page count of the bug list

  deleteBugId: string;              // the ID of the bug to be deleted
  deleteBugTitle: string;           // the title of the bug to be deleted

  deleteNotification: boolean;      // notification flag

  constructor(private bugsListService: BugsListService, private globals: GlobalsService) { }


  /**
   * 
   * Takes no parameteres
   * 
   * @returns nothing; It's the init function of the component. 
   *          Gets called on instatiation of the component and 
   *          when the user presses the Clear button in advanced search
   * 
   */


  ngOnInit() {

    // init properties
    this.currentPage = 0;
    this.titleInput = "";
    this.priorityInput = null;
    this.reporterInput = null;
    this.statusInput = null;
    this.searchFlag = false;
    this.sortBy = { value: "", order: sortType.default };
    this.deleteNotification = false;

    //get table data
    this.bugsListService.getBugsList(this.sortBy, this.currentPage)
      .subscribe(resp => {
        this.bugsList = resp.body;
        this.totalPages = resp.headers.get('Totalpages');
      });

  }

  /**
   * 
   * @param val the table head value that trigerred the function call
   * 
   * @returns nothing; stores the bugs list fetched from the service
   * into the bugsList property
   * 
   * Convension: By default the first sort will be descending.
   */


  sort(val: string): void {

    this.sortBy.value = val;

    // ckeck sortBy status
    if (this.sortBy.order === sortType.default || this.sortBy.order === sortType.asc) {
      this.sortBy.order = sortType.desc;
    }
    else { // it is desc, so change it to asc
      this.sortBy.order = sortType.asc;
    }

    // check if the user makes a search

    if (!this.searchFlag) {
      this.bugsListService.getBugsList(this.sortBy, this.currentPage)
        .subscribe(resp => {
          this.bugsList = resp.body;
          this.totalPages = resp.headers.get('Totalpages');
        });
    } else {
      this.bugsListService.searchBugsList(this.sortBy, this.currentPage, this.titleInput, this.priorityInput, this.reporterInput, this.statusInput)
        .subscribe(resp => {
          this.bugsList = resp.body;
          this.totalPages = resp.headers.get('Totalpages');
      });
    }

  }


  /**
   * 
   * @param action is the navigation action that triggered the function call
   *                can be either 'previous' or 'next'
   * 
   * @returns nothing; gets the next or the previous viewing page in the bugs list
   * 
   */


  navigate(action: string): void {
  
    if (action === "next") {
      if (!this.searchFlag) {

        this.bugsListService.getBugsList(this.sortBy, this.currentPage + 1).subscribe(resp => {
          if (resp.body.length) {
            this.bugsList = resp.body;
            this.totalPages = resp.headers.get('Totalpages');
            this.currentPage++;
          }
        });
      }
      else {
        this.bugsListService.searchBugsList(this.sortBy, this.currentPage + 1, this.titleInput, this.priorityInput, this.reporterInput, this.statusInput)
          .subscribe(resp => {
         
            if (resp.body.length) {
             
              this.bugsList = resp.body;
              this.totalPages = resp.headers.get('Totalpages');
              this.currentPage++;
            }
          });
      }



    } else if (action === "previous" && this.currentPage) {

      if (!this.searchFlag) {
        this.bugsListService.getBugsList(this.sortBy, this.currentPage - 1).subscribe(resp => {
          if (resp.body.length) {
            this.bugsList = resp.body;
            this.totalPages = resp.headers.get('Totalpages');
            this.currentPage--;
          }
        });
      }
      else {
        this.bugsListService.searchBugsList(this.sortBy, this.currentPage - 1, this.titleInput, this.priorityInput, this.reporterInput, this.statusInput)
          .subscribe(resp => {
            if (resp.body.length) {
          
              this.bugsList = resp.body;
              this.totalPages = resp.headers.get('Totalpages');
              this.currentPage--;
            }
          });
      }
    }
  }

  /**
   * 
   * Takes no parameteres.
   * 
   * @returns nothing; It is an auxiliary function used for testing
   *          purposes only.
   * 
   */


  search(): void {

    this.searchFlag = true;
    this.currentPage = 0;       // Must display the first page after a search
    this.bugsListService.searchBugsList(this.sortBy, this.currentPage, this.titleInput, this.priorityInput, this.reporterInput, this.statusInput)
      .subscribe(resp => {

        this.bugsList = resp.body;
        this.totalPages = resp.headers.get('Totalpages');
      });
  }


  /**
  * 
  * Takes no parameteres.
  * 
  * @returns nothing; searches the bug list for the user's inputs
  *          and stores the result into the bugsList property
  * 
  */

  resetSearch(): void {
    this.titleInput = "";
    this.priorityInput = null;
    this.reporterInput = null;
    this.statusInput = null;
    this.searchFlag = false;
  }


  /**
 * 
 * @param event is ID of the bug to be deleted
 * 
 * @returns nothing; It gets called after the setDeleteBug() when the user
 *          presses the "Yes delete" button of the modal. If the user decides
 *          to go forward with the delete it deletes the bug from the database and stores
 *          the new bugList in the property to be displayed.
 * 
 */

  deleteBugs(event) {

    // toggle delete notification
    this.deleteNotification = true;

    // DELETE
    this.bugsListService.deleteById(event).subscribe(() => {

      //  GET THE NEW LIST
      if (!this.searchFlag) {
        this.bugsListService.getBugsList(this.sortBy, this.currentPage)
          .subscribe(resp => {

            this.bugsList = resp.body;
            this.totalPages = resp.headers.get('Totalpages');

            // check if the item deleted was on the last page
            // if it's true we must go back a page, and load those bugs
            if (this.currentPage.toString() == this.totalPages) {
              this.currentPage--;
              this.bugsListService.getBugsList(this.sortBy, this.currentPage)
                .subscribe(resp => {
                  this.bugsList = resp.body;
                  //this.totalPages = resp.headers.get('Totalpages');
                });
            }

          });
      } else {
        this.bugsListService.searchBugsList(this.sortBy, this.currentPage, this.titleInput, this.priorityInput, this.reporterInput, this.statusInput).subscribe(resp => {

          this.bugsList = resp.body;
          this.totalPages = resp.headers.get('Totalpages');

          // check if the item deleted was on the last page
          // if it's true we must go back a page, and load those bugs
          if (this.currentPage.toString() == this.totalPages) {
            this.currentPage--;
            this.bugsListService.searchBugsList(this.sortBy, this.currentPage, this.titleInput, this.priorityInput, this.reporterInput, this.statusInput)
              .subscribe(resp => {
                this.bugsList = resp.body;
                //this.totalPages = resp.headers.get('Totalpages');
              });
          }

        });
      }
    });

    // after 5 seconds hide the delete Notification
    setTimeout(() => {
      this.deleteNotification = false;
    }, 5000);

  }



  /**
   * 
   * @param id is ID of the bug to be deleted
   * @param tile is title of the bug to be deleted
   * 
   * @returns nothing; It is called before the deleteBugs(), and sets
   *          the chosen bug to a variable.
   * 
   */

  setDeleteBug(id: string, title: string): void {
    this.deleteBugId = id;
    this.deleteBugTitle = title;
  }

}
