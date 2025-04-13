import { Component } from '@angular/core';
import { PlaylistCarouselComponent } from "../../components/playlist-carousel/playlist-carousel.component";

@Component({
  selector: 'app-playlists-overview-component',
  standalone: true,
  imports: [PlaylistCarouselComponent],
  templateUrl: './playlists-overview-component.component.html',
  styleUrl: './playlists-overview-component.component.css'
})
export class PlaylistsOverviewComponentComponent {

}
