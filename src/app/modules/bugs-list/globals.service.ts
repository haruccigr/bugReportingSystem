import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  mode: string;       // dark or white mode, a global variable

  constructor() {
    this.mode = '';
   }
   
}
