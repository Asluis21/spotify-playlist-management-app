import { Component, Input, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Playlist } from '../../models/playlist';
import { SpotifyService } from '../../services/spotify.service';
import { PlaylistCardComponent } from '../playlist-card/playlist-card.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-playlist-carousel',
  standalone: true,
  imports: [CarouselModule, PlaylistCardComponent],
  templateUrl: './playlist-carousel.component.html',
  styleUrl: './playlist-carousel.component.css'
})
export class PlaylistCarouselComponent implements OnInit {
  
  @Input({required:true}) playlistType!: String
  playlists: Playlist[] = [];

  constructor(
    private spotifyService : SpotifyService,
    private sanitizer: DomSanitizer
  ) {
    
    
  }
  ngOnInit(): void {
    if(this.playlistType == 'featured'){
      this.spotifyService.getFeaturedPlaylists().subscribe(
        res => {
          this.playlists = res;
        }
      )
    }else if (this.playlistType == 'recommended'){
      this.spotifyService.getRecommendedPlaylists().subscribe(
        res => {
          this.playlists = res;
        }
      )
    }

    console.log(this.playlists);

  }

  customOptions: OwlOptions = {

    loop: true, // if true, the carousel will loop infinitely
    margin: 10, // margin between items
    nav: true, // if true, the carousel will show next and prev buttons
    dots: false, // if true, the carousel will show dots below the items
    autoplay: true, // if true, the carousel will autoplay
    // text for next and prev buttons
    // Custom HTML for prev and next buttons
    navText: ["<",">"], 
    
    responsive:{

      // This is the default value for the carousel, 0 items for mobile devices
      // Every number refers to the width of the screen in pixels
      // And the items is the number of items to show in the carousel

      120:{
        items:1
      },
      210:{
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

  // Helper method to sanitize HTML
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  };
}
