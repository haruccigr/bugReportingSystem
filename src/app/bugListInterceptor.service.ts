import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class bugsListInterceptor implements HttpInterceptor {



    /**
     *  
     * @param req: defined in the HttpInterceptor.
     * @param next: defined in the HttpInterceptor.
     * 
     * @returns an Observable<HttpEvent<any>>. Intercepts every http request and puts
     *          the appropriate headers to the request.
     * 
     */
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        req = req.clone({ setHeaders: { Authorization: "code.hub.ng5.token" } });
        
        return next.handle(req)
            .pipe( map((event: HttpEvent<any>) => {
                return event;
        }));
    }
}