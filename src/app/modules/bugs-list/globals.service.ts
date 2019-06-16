import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  mode: string;
  constructor() {
    this.mode = '';
   }
}
