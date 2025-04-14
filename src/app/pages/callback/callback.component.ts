import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit{

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
  ){
  }

  ngOnInit() {
    const token = this.spotifyService.getAccessTokenFromURL();

    if (!!token) {
      this.spotifyService.defineToken(token, 3600);
      this.router.navigate(['/home']);
    }else{
      this.router.navigate(['/start']);
    }
  }



}
