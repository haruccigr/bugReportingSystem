import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export class bugsListInterceptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        req = req.clone({ setHeaders: { Authorization: "code.hub.ng5.token" } });
        console.log("INTERCEPTOR");
        
        return next.handle(req)
            .pipe( map((event: HttpEvent<any>) => {
                return event;
        }));
    }
}