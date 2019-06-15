import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BugsListComponent } from './modules/bugs-list/bugs-list/bugs-list.component';
import { AddEditBugsComponent } from './modules/bugs-list/add-edit-bugs/add-edit-bugs.component';
import { CheckIdExistenceService } from './modules/bugs-list/check-id-existence.service';
import { PageNotFoundComponent } from './modules/bugs-list/page-not-found/page-not-found.component';


const routes: Routes = [
  {path: '', component: BugsListComponent},
  {path: 'add', component: AddEditBugsComponent},
  {path: 'edit/:id', component: AddEditBugsComponent, canActivate: [CheckIdExistenceService]},
  {path: '**', component: PageNotFoundComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
