import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/start', pathMatch: 'full' },
    { path: 'start', loadComponent: () => import('./pages/start/start.component').then(m => m.StartComponent) },
    { path: 'callback', loadComponent: () => import('./pages/callback/callback.component').then(m => m.CallbackComponent) },
    { 
      path: 'home', 
      loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), 
      canActivate: [authGuard],
      children: [
        { path: '', redirectTo: 'search', pathMatch: 'full' },
        { 
          path: 'search', 
          loadComponent: () => import('./pages/search-section/search-section.component').then(m => m.SearchSectionComponent),
          children: [
            { path: '', redirectTo: 'new', pathMatch: 'full' },
            { 
              path: 'new', 
              loadComponent: () => import('./pages/playlists-overview-component/playlists-overview-component.component').then(m => m.PlaylistsOverviewComponentComponent) 
            },
            { path: 'playlist/:searchPlaylist', loadComponent: () => import('./components/playlist-search/playlist-search.component').then(m => m.PlaylistSearchComponent) },
            { path: 'track/:searchTracks', loadComponent: () => import('./components/track-search/track-search.component').then(m => m.TrackSearchComponent) }
          ]
        },
        { 
          path: 'playlist', 
          loadComponent: () => import('./pages/playlist-section/playlist-section.component').then(m => m.PlaylistSectionComponent),
          children: [
            { path: '', redirectTo: 'myPlaylists', pathMatch: 'full' },
            { 
              path: 'myPlaylists', 
              loadComponent: () => import('./pages/spotify-playlist-list/spotify-playlist-list.component').then(m => m.SpotifyPlaylistListComponent) 
            },
            { 
              path: 'tracks/:id', 
              loadComponent: () => import('./pages/track-list/track-list.component').then(m => m.TrackListComponent) 
            },
            { 
              path: 'create', 
              loadComponent: () => import('./pages/create-new-playlist/create-new-playlist.component').then(m => m.CreateNewPlaylistComponent) 
            },
            { 
              path: 'edit/:playlistId', 
              loadComponent: () => import('./pages/create-new-playlist/create-new-playlist.component').then(m => m.CreateNewPlaylistComponent) 
            },
            { 
              path: 'add/:trackId', 
              loadComponent: () => import('./pages/add-track-panel/add-track-panel.component').then(m => m.AddTrackPanelComponent) 
            }
          ]
        }
      ]
    }
  ];
