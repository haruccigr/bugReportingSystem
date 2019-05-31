import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
 
  getBugsList(sortBy: SortBy): Observable<Bugs[]> {
    if (sortBy.order === sortType.default) {
      return this.http.get<Bugs[]>(this.get_endpoint);
    }
    return this.http.get<Bugs[]>(`${this.get_endpoint}/?sort=${sortBy.value},${sortBy.order}`);
  }

}
