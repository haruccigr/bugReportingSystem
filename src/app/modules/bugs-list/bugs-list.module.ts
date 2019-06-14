import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugsListComponent } from './bugs-list/bugs-list.component';
import { AddEditBugsComponent } from './add-edit-bugs/add-edit-bugs.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FooterComponent } from './footer/footer.component';
import { DeleteBugsComponent } from './delete-bugs/delete-bugs.component';



@NgModule({
  declarations: [BugsListComponent, AddEditBugsComponent, HeaderComponent, PageNotFoundComponent, FooterComponent, DeleteBugsComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports:[
    BugsListComponent,
    AddEditBugsComponent,
    HeaderComponent,
    FooterComponent,
    DeleteBugsComponent
  ]
})
export class BugsListModule { }
