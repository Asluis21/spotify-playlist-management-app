import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Playlist } from '../../models/playlist';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-new-playlist',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-new-playlist.component.html',
  styleUrl: './create-new-playlist.component.css'
})
export class CreateNewPlaylistComponent implements OnInit{

  @ViewChild('fileInput') fileInput: ElementRef;
  playlistForm: FormGroup;
  playlist: Playlist;
  selectedImage: File | null = null;


  constructor(
    private fb: FormBuilder,
    private spotifyService: SpotifyService,
    private router: Router,
    private route: ActivatedRoute,
    private location:Location
  ){}

  ngOnInit(){

    this.route.params.subscribe(params => {
      const playlistId = params['playlistId'];
      
      if (playlistId) {
        this.spotifyService.getPlaylistById(playlistId).subscribe({
          next: (playlist) => {
            this.playlist = playlist;
            
            this.playlistForm.patchValue({
              name: playlist.name,
              description: playlist.description,
              isPublic: playlist.public,
            });
          }
        });
      }
    });

    this.playlistForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      isPublic: ['']
    });
  }

  submitPlaylist(): void {
    if (this.playlistForm.valid) {
      const { name, description, isPublic} = this.playlistForm.value;


      if(this.playlist){
        this.spotifyService.editPlaylist(this.playlist.id, name, description, isPublic).subscribe();
      }else{
        this.spotifyService.getUserProfile().subscribe(user => {
          this.spotifyService.createPlaylist(user.id, name, description, isPublic)
          .subscribe({
            next: () => {
              this.router.navigate(['/home']);
            }
          });
        });
      }

    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];

      this.uploadCoverImage();
    }
  }


  uploadCoverImage(): void {
    if (this.selectedImage && this.playlist) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = (reader.result as string).split(',')[1]; // Remove the data URL prefix
        this.spotifyService.changePlaylistCoverImage(this.playlist.id, base64Image).subscribe({
          next: () => {
            console.log('Playlist cover image updated successfully');
          },
          error: (err) => {
            console.log('Error updating playlist cover image:', err);
          },
        });
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  goBack(){
    this.location.back();
  }
}
