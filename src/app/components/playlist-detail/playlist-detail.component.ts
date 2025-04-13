import { Component, Input} from '@angular/core';
import { Playlist } from '../../models/playlist';

@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [],
  templateUrl: './playlist-detail.component.html',
  styleUrl: './playlist-detail.component.css'
})
export class PlaylistDetailComponent {

  @Input({required:true}) playlist!: Playlist;
}
