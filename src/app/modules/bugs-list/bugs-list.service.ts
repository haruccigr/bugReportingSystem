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
    
    if (sortBy.order === sortType.default) {

      return this.http.get<Bugs[]>(`${this.get_endpoint}/?page=${page}`, { observe: 'response' });
    }
    return this.http.get<Bugs[]>(`${this.get_endpoint}/?sort=${sortBy.value},${sortBy.order}&page=${page}`, { observe: 'response' });
  }


  /**
   * 
   * @param sortBy: The type of sort. Can be default, asc or desc.
   * @param page: The number of page to be fetched from the databse. Type of number.
   * @param title: The title of the bug to be used as a searching filter. Type of string.
   * @param priority: The priority of the bug to be used as a searching filter. Type of string.
   * @param reporter: The reporter of the bug to be used as a searching filter. Type of string.
   * @param status: The status of the bug to be used as a searching filter. Type of string.
   * 
   * @returns an Observable<HttpResponse<Bugs[]>>. The user gives the query parameters to be used
   *          as searching filters, and the service returns an Array of Bugs matching that criteria.
   *          If no matching record has been found, the empty array [] is returned instead.
   */


  searchBugsList(sortBy: SortBy, page: number, title: string, priority: string, reporter: string, status: string): Observable<HttpResponse<Bugs[]>> {

    let path = `${this.get_endpoint}?page=${page}`;

    // build the path
    if (sortBy.order != sortType.default) {
      path = `${path}&sort=${sortBy.value},${sortBy.order}`;
    }

    if (title.trim() != '') {
      path = `${path}&title=${title}`;
    }

    if (priority != null) {
      path = `${path}&priority=${priority}`;
    }

    if (reporter != null) {
      path = `${path}&reporter=${reporter}`;
    }

    if (status != null) {
      path = `${path}&status=${status}`;
    }

    return this.http.get<Bugs[]>(path, { observe: 'response' });
  }


  /**
   * 
   * @param id: The id of the Bug to be deleted. Type of string.
   * 
   * @returns an Observable<{}>. It gets the id of the bug to be deleted
   *          and if found in the database deletes it. Returns an empty object
   *          either way.
   */


  deleteById(id: string): Observable<{}> {
    return this.http.delete(`${this.get_endpoint}/${id}`);
  }
  
}
