import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'bugReporting-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  route: string;

  @Output() clicked: EventEmitter<string> = new EventEmitter();

  constructor(location: Location, router: Router) {

    // controls the navbar navigation
    router.events.subscribe((val) => {
      if(location.path() === '/add'){
        this.route = 'add';
      }
      else if(location.path() === ''){
        this.route = 'home';
      }
       else {
        this.route = 'edit';
      }
    });
  }

  ngOnInit() {

  }

  


 toggleDarkMode():void{
  this.clicked.emit('darkMode');
 }
}

