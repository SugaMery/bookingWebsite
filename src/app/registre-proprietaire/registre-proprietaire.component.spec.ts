import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistreProprietaireComponent } from './registre-proprietaire.component';

describe('RegistreProprietaireComponent', () => {
  let component: RegistreProprietaireComponent;
  let fixture: ComponentFixture<RegistreProprietaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistreProprietaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistreProprietaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
