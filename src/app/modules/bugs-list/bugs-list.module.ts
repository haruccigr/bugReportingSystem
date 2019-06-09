import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugsListComponent } from './bugs-list/bugs-list.component';
import { AddEditBugsComponent } from './add-edit-bugs/add-edit-bugs.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [BugsListComponent, AddEditBugsComponent, HeaderComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports:[
    BugsListComponent,
    AddEditBugsComponent,
    HeaderComponent
  ]
})
export class BugsListModule { }
