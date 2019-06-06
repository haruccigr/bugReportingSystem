import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BugsListComponent } from './modules/bugs-list/bugs-list/bugs-list.component';
import { AddEditBugsComponent } from './modules/bugs-list/add-edit-bugs/add-edit-bugs.component';

const routes: Routes = [
  {path: '', component: BugsListComponent},
  {path: 'add',component: AddEditBugsComponent},
  {path: 'edit/:id', component: AddEditBugsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
