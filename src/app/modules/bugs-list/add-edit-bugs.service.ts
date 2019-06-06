import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Bugs} from './bugs.model';

@Injectable({
  providedIn: 'root'
})
export class AddEditBugsService {

  private readonly get_endpoint = 'https://bug-report-system-server.herokuapp.com/bugs';

  constructor(private http: HttpClient) { }

  getBugById(id: string): Observable<Bugs>{
    if(id === ("" || null || undefined )){
      console.log("ID ERROR/ getBugById");
    }
    return this.http.get<Bugs>(`${this.get_endpoint}/${id}`);
  }

  postBug(data: Bugs): Observable<Bugs>{
    //console.log(data);
    return this.http.post<Bugs>(this.get_endpoint,data);
  }

  putBug(id: string,data: Bugs): Observable<Bugs>{
    return this.http.put<Bugs>(`${this.get_endpoint}/${id}`,data);
  }
}
