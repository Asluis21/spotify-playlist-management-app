import { Component, HostListener } from '@angular/core';
import { Playlist } from '../../models/playlist';
import { SpotifyService } from '../../services/spotify.service';
import { Track } from '../../models/track';
import { Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { PlaylistDetailComponent } from '../../components/playlist-detail/playlist-detail.component';

@Component({
  selector: 'app-spotify-playlist-list',
  standalone: true,
  imports: [PlaylistDetailComponent, RouterLink],
  templateUrl: './spotify-playlist-list.component.html',
  styleUrl: './spotify-playlist-list.component.css'
})
export class SpotifyPlaylistListComponent {

  isMobile: boolean = false;
  currentPlaylistSelected : Playlist;

  playlists: Playlist[] = [];
  tracks:Track[] = [];

  items: Playlist[] | Track[] = [];
  
  isCollapse: boolean = false;
  
  isPlaylistSelected: boolean = false;

  constructor(
    private spotifyService: SpotifyService,
    private router: Router,
    private location: Location
  ){}

  goBack(): void {
    this.location.back();
  }

  ngOnInit(){
    this.getPlaylists();
  }

  getPlaylists(){

    this.spotifyService.getPlaylists().subscribe(res =>{
      this.playlists = res;
      }
    )
  }

  getBackToPlaylists(){
    this.isPlaylistSelected = false;
  }

  selectedItem(idPlaylist : string){
    this.router.navigate(["home/playlist/tracks", idPlaylist]);
  }

}
