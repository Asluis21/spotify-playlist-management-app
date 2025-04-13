import { Component, HostListener } from '@angular/core';
import { Playlist } from '../../models/playlist';
import { SpotifyService } from '../../services/spotify.service';
import { response } from 'express';
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
  

  // currentPlaylistTittle = "";
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

    this.checkScreenSize();
    this.getPlaylists();

    
  }

  getPlaylists(){



    this.spotifyService.getPlaylists().subscribe(res =>{
      this.playlists = res;
      console.log("Spotify playlist:", res);
      }
    )

  }

  @HostListener('window:resize', [])
  onResize(){
    this.checkScreenSize();
  }

  checkScreenSize(){
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth <= 575;
    }
  }

  toggleCollapse(){
    if(this.isMobile){
      this.isCollapse = true;
      console.log(this.isCollapse);
      
      const element = document.getElementById("collapsPlaylistSpotify");
      if(element){
        element.classList.toggle("show");
        this.isCollapse =false
      }
    }
  }

  getBackToPlaylists(){

    this.isPlaylistSelected = false;
    // this.currentPlaylistTittle = "";
    // this.getPlaylists();
  }

  selectedItem(idPlaylist : string){
   

    this.router.navigate(["home/playlist/tracks", idPlaylist]);

  }

}
