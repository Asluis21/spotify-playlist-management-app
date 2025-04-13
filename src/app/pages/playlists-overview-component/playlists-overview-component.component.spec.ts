import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsOverviewComponentComponent } from './playlists-overview-component.component';

describe('PlaylistsOverviewComponentComponent', () => {
  let component: PlaylistsOverviewComponentComponent;
  let fixture: ComponentFixture<PlaylistsOverviewComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistsOverviewComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaylistsOverviewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
