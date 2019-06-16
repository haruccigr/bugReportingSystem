import { Component, OnInit, ElementRef } from '@angular/core';
import { GlobalsService } from './modules/bugs-list/globals.service';

@Component({
  selector: 'bugReporting-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bugReportingSystem';
  bgMode: string;
  private static white = 'linear-gradient(white, gray)';
  private static dark = 'linear-gradient(rgb(82, 82, 82), rgb(32, 32, 32))';

  constructor(private elementRef: ElementRef, private globals: GlobalsService) { }

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

  toggleDarkMode(): void {
    // let darkColor = 'linear-gradient(gray, black)';
    // '#303030';


    if (this.bgMode === AppComponent.dark) {
      this.bgMode = AppComponent.white;
      this.globals.mode = 'white';
    }
    else {
      this.bgMode = AppComponent.dark;
      this.globals.mode = 'dark';
    }
    localStorage.setItem('bgMode', this.bgMode);
    //this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.bgMode;
    //background-image: linear-gradient(red, yellow);
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundImage = this.bgMode;
  }


}

