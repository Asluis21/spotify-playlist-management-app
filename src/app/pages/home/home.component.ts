import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { url } from 'node:inspector';
import { SpotifyPlaylistListComponent } from "../spotify-playlist-list/spotify-playlist-list.component";
import { Router, RouterOutlet } from '@angular/router';
import { SpotifyProfile } from '../../models/spotify-profile';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SearchSectionComponent } from "../search-section/search-section.component";
import { PlaylistSectionComponent } from "../playlist-section/playlist-section.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SpotifyPlaylistListComponent, NavbarComponent, RouterOutlet, SearchSectionComponent, PlaylistSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  
  constructor(
  ){

  }

  ngOnInit() {
  }

}
