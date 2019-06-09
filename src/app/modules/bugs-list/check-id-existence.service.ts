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
export class CheckIdExistenceService implements CanActivate{

  constructor(private router: Router, private route: ActivatedRoute,
    private addEditService: AddEditBugsService ){

  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let id = next.params.id;

    return this.addEditService.getBugById(id).pipe( map(
      data => {
        if(data == null){
          return false;
        }
        return true;
      }
    ),
    catchError(() =>  {
      this.router.navigate(['**']);
      return of(false);
    })
    );

    
    /*
    let data = await this.bugsListService.getBugsList({value:null,order:'default'}).toPromise();
    // fernei MONO 10! Pws 8a pareis ola ta bugs??
    // good old for loop
    for(let i = 0;i<data.length; i++ ){

      if(data[i].id == id){
        console.log("MPIKE");
        return true;
      }
    }

    this.router.navigate(['']);
    return false;
    */
    /*
    this.bugsListService.getBugsList({value:null,order:'default'}).subscribe(data=>{
      data.map(obj=>{
        console.log(obj.id);
        console.log(id);
        console.log('/ ');
        if(obj.id == id){
          console.log("MPIKE");
          return true;
        }
        //this.router.navigate(['']); // '/404-url'
        return false;
      });
    });
    */


   }


   
}
