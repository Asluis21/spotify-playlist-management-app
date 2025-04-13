import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {

  constructor(
    private spotifyService: SpotifyService,
  ){ }

  login(){
    this.spotifyService.redirectToSpotifyLogin();
  }
}
