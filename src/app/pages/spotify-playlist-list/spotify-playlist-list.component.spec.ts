import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyPlaylistListComponent } from './spotify-playlist-list.component';

describe('SpotifyPlaylistListComponent', () => {
  let component: SpotifyPlaylistListComponent;
  let fixture: ComponentFixture<SpotifyPlaylistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotifyPlaylistListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpotifyPlaylistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
