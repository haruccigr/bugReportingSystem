import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bugs, sortType, SortBy } from './bugs.model';


@Injectable({
  providedIn: 'root'
})
export class BugsListService {

  private readonly get_endpoint = 'https://bug-report-system-server.herokuapp.com/bugs';

  constructor(private http: HttpClient) { }

  /**
   * 
   * @param sortBy a variable which holds information about whether the
   * user wants to get a sorted list of bugs or not
   * 
   * @returns an array of data type 'Bugs', that has been fetched from
   * the server
   * 
   */
 
  getBugsList(sortBy: SortBy, page: number): Observable<HttpResponse<Bugs[]>> {
    console.log("getBugsList");
    if (sortBy.order === sortType.default) {
      
      return this.http.get<Bugs[]>(`${this.get_endpoint}/?page=${page}`,{observe:'response'});
    }
    return this.http.get<Bugs[]>(`${this.get_endpoint}/?sort=${sortBy.value},${sortBy.order}&page=${page}`,{observe:'response'});
  }

  searchBugsList(sortBy: SortBy, page: number, title:string, priority:string, reporter:string, status:string): Observable<HttpResponse<Bugs[]>>{
    page = 0;       // force the search for every item in the table
    let path = `${this.get_endpoint}?page=${page}`;

    // build the path
    if(sortBy.order != sortType.default){
      path = `${path}&sort=${sortBy.value},${sortBy.order}`;
    }
    
    if(title.trim() != ''){
      path = `${path}&title=${title}`;
    }

    if(priority.trim() != ''){
      path = `${path}&priority=${priority}`;
    }

    if(reporter.trim() != ''){
      path = `${path}&reporter=${reporter}`;
    }

    if(status.trim() != ''){
      path = `${path}&status=${status}`;
    }
    console.log("SearchBugsList");
    console.log(path);
    return this.http.get<Bugs[]>(path,{observe:'response'});
  }
}
