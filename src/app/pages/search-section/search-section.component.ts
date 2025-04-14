import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Playlist } from '../../models/playlist';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-search-section',
  standalone: true,
  imports: [RouterLink, NgClass, FormsModule, CarouselModule, RouterOutlet],
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

    if (this.activeTab === 'track') {
      this.router.navigate(['/home/search/track', trimmedSearchBar]);

    } else if (this.activeTab === 'playlist') {
      
      this.router.navigate(['/home/search/playlist', trimmedSearchBar]);
    
    }
  }

}
