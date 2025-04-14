import { Component, Input } from '@angular/core';
import { Track } from '../../models/track';
import { SpotifyService } from '../../services/spotify.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-track-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './track-detail.component.html',
  styleUrl: './track-detail.component.css'
})
export class TrackDetailComponent {

  @Input({required:true}) track!: Track;
  @Input({required:false}) followed: Boolean;
  @Input({required:false}) playlistId: string;

  constructor(
    private spotifyService:SpotifyService,
  ){ }

  removeTrack(){
    this.spotifyService.removeTrackFromPlaylist(this.playlistId, this.track.id).subscribe({
      next: () => {
        this.followed = false;
      }
    });
  }
}
