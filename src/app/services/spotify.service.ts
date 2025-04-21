import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, firstValueFrom, map, throwError } from 'rxjs';
import { Playlist } from '../models/playlist';
import { SpotifyProfile } from '../models/spotify-profile';
import { Track } from '../models/track';
import { environment } from '../../environments/environment';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private client_id = environment.spotifyClientId;
  private redirect_uri = environment.spotifyRedirectUri;
  private apiUrl = environment.spotifyApiBaseUrl;
  
  constructor(
    private http: HttpClient,
    private loggingService: LoggingService
  ) { 
  }

  generateRandomString(length: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  private getHeaders(contentType: string = 'application/json'): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': contentType
    });
  }

  redirectToSpotifyLogin() {
    const state = this.generateRandomString(16);

    // Centralized scope definition
    const scope = [
      'user-read-private',
      'user-read-email',
      'playlist-read-private',
      'user-read-currently-playing',
      'playlist-modify-private',
      'playlist-modify-public',
      'ugc-image-upload'
    ].join(' '); // Join scopes with a space

    const authUrl = `${environment.spotifyAuthBaseUrl}?response_type=token&client_id=${this.client_id}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(this.redirect_uri)}&state=${state}`;

    window.location.href = authUrl;
  }
  
  getSpotifyToken() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('spotifyToken');
      const expiry = localStorage.getItem('spotifyTokenExpiry');
      if (token && expiry && Date.now() < parseInt(expiry, 10)) {
        return token;
      }
      return null;
    }
    return null;

    
  }

  getUserProfile() {
    return this.http.get(`${this.apiUrl}/me`).pipe(
      map((res:any) => new SpotifyProfile(res)),
      catchError((err) => {
        this.loggingService.logError("Error fetching profile: ", err);
        return throwError(() => new Error(err));
      })
    );
  }
  
  

  getPlaylistTracks(playlistId:string) {
    return this.http.get(`${this.apiUrl}/playlists/${playlistId}/tracks`).pipe(
      map((res:any) => res.items.map(item => new Track(item.track))),
      catchError((err) => {
        this.loggingService.logError("Error fetching tracks: ", err);
        return throwError(() => new Error(err));
      })
    );
  }

  searchTracks(query:String){
    return this.http.get(`${this.apiUrl}/search?q=${query}&type=track`).pipe(
      map((res:any) => res.tracks.items.map(track => new Track(track))),
      catchError((err) => {
        this.loggingService.logError("Error fetching tracks: ", err);
        return throwError(() => new Error(err));
      })
    );
  }

  getTrackById(trackId: string) {
    return this.http.get<Track>(`${this.apiUrl}/tracks/${trackId}`).pipe(
      map((res: any) => new Track(res)),
      catchError((err) => {
        this.loggingService.logError("Error fetching track: ", err);
        return throwError(() => new Error(err));
      })
    );
  }

  searchPlaylist(query: String, limit: number = 20, offset: number = 0) {
  return this.http.get<{ playlists: { items: any[], total: number, next: string } }>(`${this.apiUrl}/search?q=${query}&type=playlist&limit=${limit}&offset=${offset}`).pipe(
    map((res:any) => res.playlists.items ? res.playlists.items.filter(playlist => playlist != null).map(playlist => new Playlist(playlist)) : []),
    catchError((err) => {
      this.loggingService.logError("Error fetching playlists: ", err);
      return throwError(() => new Error(err));
    })
  );
}

  getFeaturedPlaylists(){
    return this.searchPlaylist("features");
  }
  
  getRecommendedPlaylists(){
    return this.searchPlaylist("recommended");
  }

  isFollowingPlaylist(playlistId: string, userId: string) {
    return this.http.get<boolean[]>(`${this.apiUrl}/playlists/${playlistId}/followers/contains?ids=${userId}`).pipe(
      map(res => res[0]), // The API returns an array of booleans
      catchError((err) => {
        this.loggingService.logError("Error checking if following playlist: ", err);
        return throwError(() => new Error(err));
      })
    );
  }

  async verifyFollowedPlaylist(playlistId: string): Promise<boolean> {
    try {
      const user = await firstValueFrom(this.getUserProfile());
      const isFollowing = await firstValueFrom(this.isFollowingPlaylist(playlistId, user.id));
      return isFollowing;
    } catch (error) {
      this.loggingService.logError("Error verifying followed playlist: ", error);
      return false;
    }
  }

  getPlaylists() {
    return this.http.get<{ items: any[] }>(`${this.apiUrl}/me/playlists`).pipe(
      map((res) => res.items ? res.items.map((playlist) => new Playlist(playlist)) : []),
      catchError((err) => {
        this.loggingService.logError("Error fetching the playlists:", err);
        this.logout();
        return throwError(() => new Error(err));
      })
    );
  }

  followPlaylist(playlistId: string) {
    return this.http.put(`${this.apiUrl}/playlists/${playlistId}/followers`, {}).pipe(
      catchError((err) => {
        this.loggingService.logError("Error following playlist: ", err);
        return throwError(() => new Error(err));
      })
    );
  }

  unfollowPlaylist(playlistId: string) {
    return this.http.delete(`${this.apiUrl}/playlists/${playlistId}/followers`).pipe(
      catchError((err) => {
        this.loggingService.logError("Error unfollowing playlist: ", err);
        return throwError(() => new Error(err));
      })
    );
  }

  deletePlaylist(playlistId: string) {
    return this.http.delete(`${this.apiUrl}/playlists/${playlistId}`).pipe(
      catchError((err) => {
        this.loggingService.logError("Error deleting playlist: ", err);
        return throwError(() => new Error(err));
      })
    );
  }

  getPlaylistById(playlist_id:string){
    return this.http.get(`https://api.spotify.com/v1/playlists/${playlist_id}`).pipe(
      map((res:any) => new Playlist(res)),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }

  createPlaylist(userId: string, name: string, description: string = '', isPublic: boolean = true) {
    const body = {
      name: name,
      description: description,
      public: isPublic
    };
    return this.http.post<Playlist>(`${this.apiUrl}/users/${userId}/playlists`, body).pipe(
      catchError((err) => {
        this.loggingService.logError("Error creating playlist: ", err);
        return throwError(() => new Error(err));
      })
    );
  }

  removeTrackFromPlaylist(playlistId: string, trackUri: string) {
    const body = {
      tracks: [{ uri: 'spotify:track:'+trackUri }]
    };
    return this.http.request('DELETE', `${this.apiUrl}/playlists/${playlistId}/tracks`, { body }).pipe(
      catchError((err) => {
        this.loggingService.logError("Error removing track from playlist: ", err);
        return throwError(() => new Error(err));
      })
    );
  }

  addTrackToPlaylist(playlistId: string, trackUri: string){
    const body = {
      uris: ['spotify:track:'+trackUri]
    };
    return this.http.post(`${this.apiUrl}/playlists/${playlistId}/tracks`, body).pipe(
      catchError((err) => {
        this.loggingService.logError("Error adding track to playlist: ", err);
        return throwError(() => new Error(err));
      })
    );
  }

  editPlaylist(playlistId: string, name: string, description: string = '', isPublic: boolean) {
    const body = {
      name: name,
      description: description,
      public: isPublic
    };
    return this.http.put(`${this.apiUrl}/playlists/${playlistId}`, body).pipe(
      catchError((err) => {
        this.loggingService.logError("Error editing playlist: ", err);
        return throwError(() => new Error(err));
      })
    );
  }

  changePlaylistCoverImage(playlistId: string, base64Image: string) {
    const headers = this.getHeaders('image/jpeg');
  
    return this.http.put(`${this.apiUrl}/playlists/${playlistId}/images`, base64Image, { headers }).pipe(
      catchError((err) => {
        this.loggingService.logError('Error changing playlist cover image:', err);
        return throwError(() => new Error(err));
      })
    );
  }

  getAccessTokenFromURL() {
    if (typeof window !== 'undefined' && window.location && window.location.hash) {
      const params = new URLSearchParams(window.location.hash.substring(1));
      return params.get('access_token') || '';
    }
    return '';
  }

  defineToken(token: string, expiresIn:number){
    if (token) {
      localStorage.setItem('spotifyToken', token);
      localStorage.setItem('spotifyTokenExpiry', (Date.now() + expiresIn * 1000).toString());
    }
  }

  

  logout(){
    if(this.getSpotifyToken()){
      localStorage.removeItem("spotifyToken")
    }
  }
}