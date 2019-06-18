import { Component, OnInit, ElementRef } from '@angular/core';
import { GlobalsService } from './modules/bugs-list/globals.service';

@Component({
  selector: 'bugReporting-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'bugReportingSystem';

  bgMode: string;                                                                   // the backgroundMode that is currently used
  private static white = 'linear-gradient(white, gray)';                            // the white color
  private static dark = 'linear-gradient(rgb(82, 82, 82), rgb(32, 32, 32))';        // the dark color

  constructor(private elementRef: ElementRef, private globals: GlobalsService) { }



  /**
   * 
   *  Takes no arguments.
   * 
   * @returns nothing. It is basically the init function of the app core component.
   *          On init, checks whether the user has toggled in the past the dark mode.
   *          If yes, then loads the respective theme. Otherwise, sets the theme by default to
   *          white.
   * 
   */


  ngOnInit(): void {

    let mode = localStorage.getItem('bgMode');

    if (mode === null || mode === undefined) {
      this.bgMode = AppComponent.white;       // vibrant color
      this.globals.mode = 'white';
    }
    else {
      this.bgMode = mode;
      if (mode === AppComponent.white) {
        this.globals.mode = 'white';
      } else {
        this.globals.mode = 'dark';
      }
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundImage = this.bgMode;
    }
  }



  /**
   * 
   * Takes no arguments.
   * 
   * @returns nothing. It gets called when the user presses the dark mode button on the navbar.
   *          The header component emits an event and informs the app component that the user
   *          toggled dark mode. The app components receives this event, and this function is called
   *          to handle the functionality. If the current the is dark, changes to white and reverse.
   * 
   */


  toggleDarkMode(): void {

    if (this.bgMode === AppComponent.dark) {
      this.bgMode = AppComponent.white;
      this.globals.mode = 'white';
    }
    else {
      this.bgMode = AppComponent.dark;
      this.globals.mode = 'dark';
    }
    localStorage.setItem('bgMode', this.bgMode);

    this.elementRef.nativeElement.ownerDocument.body.style.backgroundImage = this.bgMode;
  }


}

