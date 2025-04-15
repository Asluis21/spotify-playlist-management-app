import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Playlist } from '../../models/playlist';
import { SpotifyService } from '../../services/spotify.service';
import { Location } from '@angular/common';
import { TrackDetailComponent } from '../../components/track-detail/track-detail.component';
import { SpotifyProfile } from '../../models/spotify-profile';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [TrackDetailComponent, RouterLink],
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.css'
})
export class TrackListComponent implements OnInit{

  playlist:Playlist;
  isMobile: boolean = false;
  isCollapse: boolean = false;
  currentUser: SpotifyProfile = new SpotifyProfile();
  isOwner:boolean = false;
  isFollowing:boolean;

  constructor
  (
    private router:Router,
    private route:ActivatedRoute,
    private spotifyService:SpotifyService,
    private location:Location
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const playlistId = params['id'];
      if (playlistId) {
        this.loadCurrentUser().then(() => {
          this.loadPlaylist(playlistId);
          this.spotifyService.verifyFollowedPlaylist(playlistId).then(
            res => {
              console.log("res: " + res);
              this.isFollowing = res;
            }
          );
        });
      }
    });
  }

  loadCurrentUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.spotifyService.getUserProfile().subscribe({
        next: res => {
          this.currentUser = res;
          resolve();
        },
        error: err => reject(err)
      })
    });
  }

  loadPlaylist(playlistId:string):void{
    this.spotifyService.getPlaylistById(playlistId).subscribe(
      playlistFound => {
        console.log("Playlist Found: ", playlistFound);
        
        this.playlist = playlistFound;
        this.isOwner = this.playlist?.owner?.id === this.currentUser?.id;
      }
    );
  }

  followPlaylist(){
    
    this.spotifyService.followPlaylist(this.playlist.id).subscribe({
      next: res => {
        this.isFollowing = true;
      },
      error: err => {
      }
    }); 
  }

  unfollowPlaylist(){
    this.spotifyService.unfollowPlaylist(this.playlist.id).subscribe({
      next: res => {
        this.isFollowing = false;
        if(this.isOwner){
          this.router.navigate(['/home/playlist/myPlaylists']);
        }
      }
    })
  }


  goBack(): void {
    this.location.back();
  }


  getBackToPlaylists(){
    this.router.navigate(['/home'])
  }

}
