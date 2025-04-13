import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { throwError } from 'rxjs';
import { SpotifyProfile } from '../../models/spotify-profile';
import { resolve } from 'path';
import { Playlist } from '../../models/playlist';
import { Track } from '../../models/track';
import { PlaylistDetailComponent } from '../../components/playlist-detail/playlist-detail.component';

@Component({
  selector: 'app-add-track-panel',
  standalone: true,
  imports: [PlaylistDetailComponent],
  templateUrl: './add-track-panel.component.html',
  styleUrl: './add-track-panel.component.css'
})
export class AddTrackPanelComponent {

  currentUser: SpotifyProfile = new SpotifyProfile();
  playlists: Playlist[] = [];
  selectedPlaylists: Set<string> = new Set();
  newSelectedPlaylists: Set<string> = new Set();
  track:Track;
  trackUri: string = '';

  constructor(
    private spotifyService: SpotifyService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  )
  {}

  ngOnInit():void{
    this.route.params.subscribe(params =>{
      this.trackUri = params['trackId'];

      this.spotifyService.getTrackById(this.trackUri).subscribe(
        res => {
          this.track = res;
          console.log("Track:", res);
          
        }
      )

      if(this.trackUri){
        this.loadCurrentUser().then(()=>{
          this.loadUserPlaylists();
        })
      }
    })
  }
  
  loadCurrentUser(): Promise<void>{
    return new Promise((resolve, reject) => {
      this.spotifyService.getUserProfile().subscribe({
          next: res => {
            this.currentUser = res;
            resolve();
          },
          error: err => reject(err)
      });
    });
  }

  loadUserPlaylists(): void {
    this.spotifyService.getPlaylists().subscribe(
      playlistsFound => {
        this.playlists = playlistsFound.filter(playlist => playlist.owner.id == this.currentUser.id);
        this.checkTrackInPlaylists();
      }  
    );
  }

  checkTrackInPlaylists(): void {
    this.playlists.forEach((playlist) => {
      this.spotifyService.getPlaylistTracks(playlist.id).subscribe(
        tracksFound => {
          tracksFound.forEach(track => {
            if(track.id == this.trackUri){
              this.selectedPlaylists.add(playlist.id);
            }
          });
        }
      );
    })
  }

  addTrackToSelectedPlaylists(): void {

    console.log(this.selectedPlaylists);
    

    this.newSelectedPlaylists.forEach((playlistId) => {
      this.spotifyService.addTrackToPlaylist(playlistId, this.trackUri).subscribe({
        next:() => {
          console.log(`Track added to playlist ${playlistId}`);
          this.router.navigate(['/home/playlist']);
        },
        error:(error) => {
          console.log(`Error adding track to playlist ${playlistId}:`, error);
        }
      });
    });
  }

  togglePlaylistSelection(playlistId: string): void {
    if (this.selectedPlaylists.has(playlistId) || this.newSelectedPlaylists.has(playlistId)) {
      this.newSelectedPlaylists.delete(playlistId);
    } else {
      this.newSelectedPlaylists.add(playlistId);
    }
  }


  goBack(){
    this.location.back();
  }
}
