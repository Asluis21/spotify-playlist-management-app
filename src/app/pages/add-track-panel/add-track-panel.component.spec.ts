import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrackPanelComponent } from './add-track-panel.component';

describe('AddTrackPanelComponent', () => {
  let component: AddTrackPanelComponent;
  let fixture: ComponentFixture<AddTrackPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTrackPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTrackPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
