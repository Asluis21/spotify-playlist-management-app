import { Component, OnInit } from '@angular/core';
import { SpotifyProfile } from '../../models/spotify-profile';
import { SpotifyService } from '../../services/spotify.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  
  spotifyProfile:SpotifyProfile = new SpotifyProfile();
  
  constructor(
    private spotifyService:SpotifyService
  ){ }

  ngOnInit(): void {
    this.spotifyService.getUserProfile().subscribe(res => {
      this.spotifyProfile = res
    });
  }

  logout(){
    this.spotifyService.logout();
  }
}
