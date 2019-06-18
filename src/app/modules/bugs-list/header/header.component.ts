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

  @Output() clicked: EventEmitter<string> = new EventEmitter();       // an event emitter to app component
  // to inform that the dark mode has been toggled


  constructor(location: Location, router: Router) {

    // controls the navbar navigation
    router.events.subscribe((val) => {
      if (location.path() === '/add') {
        this.route = 'add';
      }
      else if (location.path() === '') {
        this.route = 'home';
      }
      else {
        this.route = 'edit';
      }
    });
  }

  ngOnInit() {

  }

  /**
   * 
   * Takes no arguments
   * 
   * @returns nothing. It gets called the user has pressed the dark mode button.
   *          Emits an event so as to inform the app component that the mode should be changed.
   * 
   */

  toggleDarkMode(): void {
    this.clicked.emit('darkMode');
  }

}

