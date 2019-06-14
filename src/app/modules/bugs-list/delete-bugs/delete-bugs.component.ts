import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'bugReporting-delete-bugs',
  templateUrl: './delete-bugs.component.html',
  styleUrls: ['./delete-bugs.component.css']
})
export class DeleteBugsComponent implements OnInit {

  @Input() id : string;
  @Input() title : string;
  @Output() clicked: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {

  }

  getTheId(): void{
    this.clicked.emit(this.id);
    //console.log("the id is:" + this.id);
  }

}
