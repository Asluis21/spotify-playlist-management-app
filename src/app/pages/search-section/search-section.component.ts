import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { FormsModule } from '@angular/forms';
import { Playlist } from '../../models/playlist';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { PlaylistCarouselComponent } from "../../components/playlist-carousel/playlist-carousel.component";
import { PlaylistSearchComponent } from '../../components/playlist-search/playlist-search.component';
import { TrackSearchComponent } from '../../components/track-search/track-search.component';



@Component({
  selector: 'app-search-section',
  standalone: true,
  imports: [RouterLink, NgClass, FormsModule, CarouselModule, PlaylistCarouselComponent, PlaylistSearchComponent, TrackSearchComponent, RouterOutlet],
  templateUrl: './search-section.component.html',
  styleUrl: './search-section.component.css'
})
export class SearchSectionComponent{

  activeTab:string = 'track';
  isSearching:boolean = false;
  searchBar:String = "";
  playlists: Playlist[] = [];
  tracks: Playlist[] = [];

  customOptions: OwlOptions = {
    loop: false,
    margin: 10,
    nav: true,
    dots: false,
    navText: ["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
    responsive:{
      120:{
        items:1
      },
      250:{
        items:2
      },
      380:{
        items:3
      },
      510:{
        items:4
      },
      640:{
        items:5
      },
      770:{
        items:6
      }
    }
  };

  constructor(
    private spotifyService:SpotifyService,
    private router:Router
  ){

  }

  onSubmit($event: any) {
    $event.preventDefault();
    this.searchItem();
  }

  searchFor(tab:string){
    
    this.activeTab = tab;
  }

  searchItem(){

    const trimmedSearchBar = this.searchBar.trim();
    if (trimmedSearchBar === '') {
      this.isSearching = false;
      return;
    }
    
    // this.isSearching = true;
    console.log("this.searchBar", this.searchBar);
    

    if (this.activeTab === 'track') {
      this.router.navigate(['/home/search/track', trimmedSearchBar]);

      // this.spotifyService.searchTracks(trimmedSearchBar).subscribe({
      //   next:(tracks) => {
      //       this.tracks = tracks;
      //       console.log('Tracks:', tracks);
      //   },
      //   error:(error)=>{
      //     console.error('Error fetching tracks:', error);
      //   }
      // });
    } else if (this.activeTab === 'playlist') {
      
      this.router.navigate(['/home/search/playlist', trimmedSearchBar]);
      
      // this.spotifyService.searchPlaylist(trimmedSearchBar).subscribe({

      //   next:(playlists) => {
      //     this.playlists = playlists;
      //     console.log('Playlists:', playlists);
      //   },
      //   error:(error) => {
      //     console.error('Error fetching playlists:', error);
      //   }
      
      // });
    }
  }

}
