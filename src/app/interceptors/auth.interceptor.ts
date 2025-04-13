import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const spotifyService = inject(SpotifyService);
  const router = inject(Router);

  // Add token to every request in the header
  const authReq = req.clone(
    {
      setHeaders: { 'Authorization': `Bearer ${spotifyService.getSpotifyToken()}`}
    }
  )

  return next(authReq).pipe(
    catchError((err:HttpErrorResponse) => {

      // if there's an error 401 in our request, logout and redirect to start page
      if (err.status === 401) {
        spotifyService.logout();
        router.navigate(['/start'], { replaceUrl: true });
      }
      return throwError(() => new Error(err.message));
    })
  );
};
