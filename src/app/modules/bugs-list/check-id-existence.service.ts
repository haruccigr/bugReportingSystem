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
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let id = next.params.id;

    return this.addEditService.getBugById(id).pipe(map(
      data => {
        if (data == null) {
          return false;
        }
        return true;
      }
    ),
      catchError(() => {
        this.router.navigate(['**']);
        return of(false);
      })
    );

  }



}
