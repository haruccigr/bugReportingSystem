import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugsListComponent } from './bugs-list/bugs-list.component';

@NgModule({
  declarations: [BugsListComponent],
  imports: [
    CommonModule
  ],
  exports:[
    BugsListComponent
  ]
})
export class BugsListModule { }
