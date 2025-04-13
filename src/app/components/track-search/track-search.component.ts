import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Track } from '../../models/track';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { TrackDetailComponent } from '../track-detail/track-detail.component';

@Component({
  selector: 'app-track-search',
  standalone: true,
  imports: [TrackDetailComponent],
  templateUrl: './track-search.component.html',
  styleUrl: './track-search.component.css'
})
export class TrackSearchComponent implements OnInit, OnChanges {

  // @Input({required:true}) track!: String;

  searchTrack: String = '';
  tracks: Track[] = []

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute
    
  ){}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['track']){
      console.log("Changes");
      this.showTracks();
      
    }
  }

  showTracks(){
    if(this.searchTrack.trim() != '') {
      console.log(this.searchTrack);
  
      this.spotifyService.searchTracks(this.searchTrack)
        .subscribe(res => {
          this.tracks = res;
        }
      );
  
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const trackName = params['searchTracks'];
      console.log(params['searchTracks']);
      
      if(trackName){
        this.searchTrack = trackName;
        this.showTracks();
      }

    });
  }



  addTrack(id_track:String){
    console.log(id_track);
    
  }
}
