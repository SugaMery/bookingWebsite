import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitesSettingsComponent } from './activites-settings.component';

describe('ActivitesSettingsComponent', () => {
  let component: ActivitesSettingsComponent;
  let fixture: ComponentFixture<ActivitesSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitesSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivitesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
