import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Bugs,sortType,SortBy} from './bugs.model';


@Injectable({
  providedIn: 'root'
})
export class BugsListServiceService {

  private readonly get_endpoint = 'https://bug-report-system-server.herokuapp.com/bugs';

  constructor(private http: HttpClient) { }



  getBugsList(sortBy: SortBy): Observable<Bugs[]>{
      if (sortBy.order === sortType.default){
        return this.http.get<Bugs[]>(this.get_endpoint);
      }
      return this.http.get<Bugs[]>(`${this.get_endpoint}/?sort=${sortBy.value},${sortBy.order}`);
  }

}
