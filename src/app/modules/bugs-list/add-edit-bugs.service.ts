import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bugs } from './bugs.model';

@Injectable({
  providedIn: 'root'
})
export class AddEditBugsService {

  private readonly get_endpoint = 'https://bug-report-system-server.herokuapp.com/bugs';

  constructor(private http: HttpClient) { }


  /**
   * 
   * @param id: the id of the bug to be fetched from the database. Type of string.
   * 
   * @returns an Observable<Bugs>. That is, the bug fetched from the server with the id given.
   *          The owner of the component that has injected the service must subscribe
   *          in order to get the data from the server. It returns the bug that has the id given.
   *          If the id is not found in the database the empty array is returned instead.
   * 
   */

  getBugById(id: string): Observable<Bugs> {

    // for testing purposes
    if (id === "" || id === null || id === undefined) {
      console.log("ID ERROR/ getBugById");
    }
    return this.http.get<Bugs>(`${this.get_endpoint}/${id}`);
  }

  /**
   * 
   * @param data: The data to be posted to the database. Type of Bugs.
   * 
   * @returns an Observable<Bugs>. That is, the data that the user provided.
   *          If the service cannot post the data, it returns an empty array or null.
   * 
   */

  postBug(data: Bugs): Observable<Bugs> {
    return this.http.post<Bugs>(this.get_endpoint, data);
  }

  /**
   * 
   * @param id: The record with the id to be updated, type of string.
   * 
   * @param data: The updated information to be put into the database.
   * 
   * @returns an Observable<Bugs>. That is, the data that the user has provided.
   *          If the operation fails it returns an empty array of null.
   */

  putBug(id: string, data: Bugs): Observable<Bugs> {
    return this.http.put<Bugs>(`${this.get_endpoint}/${id}`, data);
  }
  
}
