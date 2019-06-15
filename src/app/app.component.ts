import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'bugReporting-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bugReportingSystem';
  bgMode: string;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    let mode = localStorage.getItem('bgMode');

    if (mode === null || mode === undefined) {
      this.bgMode = 'white';
    } else {
      this.bgMode = mode;
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.bgMode;
    }
  }

  toggleDarkMode(): void {
    let darkColor = '#303030';

    if (this.bgMode === darkColor) {
      this.bgMode = 'white';
    }
    else {
      this.bgMode = darkColor;
    }
    localStorage.setItem('bgMode', this.bgMode);
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.bgMode;
  }


}

