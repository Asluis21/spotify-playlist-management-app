import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  // This guard checks if the user is authenticated by calling the Spotify API to get the user profile.
  // If the user is authenticated, it returns true, allowing access to the route.
  // This guard works every time we navigate to a route that has this guard.
  
  const router = inject(Router);
  const spotifyService = inject(SpotifyService);
  
  return spotifyService.getUserProfile().pipe(
    map(res => {
      return true;
    }), 
    catchError((err) => {
      spotifyService.logout();
      router.navigate(['/start'], {replaceUrl:true});
      return of(false);
    })
  );
};

