import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Playlist } from '../../models/playlist';
import { PlaylistCardComponent } from '../playlist-card/playlist-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playlist-search',
  standalone: true,
  imports: [PlaylistCardComponent],
  templateUrl: './playlist-search.component.html',
  styleUrl: './playlist-search.component.css'
})
export class PlaylistSearchComponent implements OnChanges, OnInit{

  searchPlaylist: String = '';

  playlists: Playlist[] = []

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute
  ) {
  }
  
  ngOnInit(){
    this.route.params.subscribe(params => {
      const playlistsName = params['searchPlaylist'];

      if(playlistsName){
        this.searchPlaylist = playlistsName;
        this.showPlaylists();
      }

    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['searchPlaylist']){
      this.showPlaylists();
    }
  }

  showPlaylists(){
    if(this.searchPlaylist.trim() != '') {
  
      this.spotifyService.searchPlaylist(this.searchPlaylist)
        .subscribe(res => {
          this.playlists = res;
        }
      );
  
    }
  }
}
