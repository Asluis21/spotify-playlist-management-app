import { Component, Input } from '@angular/core';
import { Playlist } from '../../models/playlist';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-playlist-card',
  standalone: true,
  imports: [],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.css'
})
export class PlaylistCardComponent {

  @Input({required:true}) playlist!: Playlist;

  constructor(private router:Router){ }

  searchPlaylist(playlist_id : String){
    this.router.navigate(['home/playlist/tracks', playlist_id]);
  }
}
