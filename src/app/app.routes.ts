import { Routes } from '@angular/router';
import { StartComponent } from './pages/start/start.component';
import { HomeComponent } from './pages/home/home.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { authGuard } from './guards/auth.guard';
import { SpotifyPlaylistListComponent } from './pages/spotify-playlist-list/spotify-playlist-list.component';
import { TrackListComponent } from './pages/track-list/track-list.component';
import { PlaylistSectionComponent } from './pages/playlist-section/playlist-section.component';
import { SearchSectionComponent } from './pages/search-section/search-section.component';
import { PlaylistsOverviewComponentComponent } from './pages/playlists-overview-component/playlists-overview-component.component';
import { PlaylistSearchComponent } from './components/playlist-search/playlist-search.component';
import { TrackSearchComponent } from './components/track-search/track-search.component';
import { CreateNewPlaylistComponent } from './pages/create-new-playlist/create-new-playlist.component';
import { AddTrackPanelComponent } from './pages/add-track-panel/add-track-panel.component';

export const routes: Routes = [
    {path:'', redirectTo:'/start', pathMatch: 'full'},
    {path:'start', component: StartComponent},
    {path:'callback', component: CallbackComponent},
    {path:'home', component: HomeComponent, canActivate:[authGuard],
        children:[
            {path:'', redirectTo:'search', pathMatch:'full'},
            {path:'search', component: SearchSectionComponent,
                children:[
                    {path:'', redirectTo:'new', pathMatch:'full'},
                    {path: 'new', 
                    loadComponent: () => 
                        import('./pages/playlists-overview-component/playlists-overview-component.component').then(
                        (m) => m.PlaylistsOverviewComponentComponent
                        ),
                    },
                    {path:'playlist/:searchPlaylist', component: PlaylistSearchComponent},
                    {path:'track/:searchTracks', component: TrackSearchComponent},
                ]
            },
            {path:'playlist', component: PlaylistSectionComponent, 
                children:[
                    {path:'', redirectTo:'myPlaylists', pathMatch:'full'},
                    {path:'myPlaylists', component: SpotifyPlaylistListComponent},
                    {path:'tracks/:id', component: TrackListComponent},
                    {path:'create', component: CreateNewPlaylistComponent},
                    {path:'edit/:playlistId', component: CreateNewPlaylistComponent},
                    {path:'add/:trackId', component: AddTrackPanelComponent},
                ]
            },
        ]
    },
];
