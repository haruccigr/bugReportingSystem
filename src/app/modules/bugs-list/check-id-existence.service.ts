import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router, ActivatedRoute } from '@angular/router';
import { BugsListService } from './bugs-list.service';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { AddEditBugsService } from './add-edit-bugs.service';
import { pipe } from '@angular/core/src/render3';


@Injectable({
  providedIn: 'root'
})
export class CheckIdExistenceService implements CanActivate {

  constructor(private router: Router, private route: ActivatedRoute,
    private addEditService: AddEditBugsService) {

  }


  /**
   *  
   * @param next: defined in the interface of CanActivate
   * @param state: defined in the interface of CanActivate.
   * 
   * 
   * @returns an Observable<boolean>. It is the guard service for the edid page. Checks if
   *          the ID of the item to be edited exists. If it's found in the database, returns true
   *          and the user can edit that bug, otherwise it returns false the user is redirected to
   *          a 404 page not found.
   *  
   */


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
 
    let id = next.params.id;

    return this.addEditService.getBugById(id).pipe(map(
      data => {
        if (data == null) { // not found
          return false;
        }
        return true;        // success
      }
    ),
      catchError(() => {
        this.router.navigate(['**']);
        return of(false);
      })
    );

  }



}
