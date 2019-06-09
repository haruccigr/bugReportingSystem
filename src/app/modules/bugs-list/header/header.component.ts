import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'bugReporting-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  darkMode = false;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }



 toggleDarkMode():void{
   let color;
  if(!this.darkMode){
    color = 'rgb(86,61,124)';
    this.darkMode = true;
  }
  else{
    color = 'white';
    this.darkMode = false;
  }
  this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = color;
 }
}

