import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresseModifierComponent } from './adresse-modifier.component';

describe('AdresseModifierComponent', () => {
  let component: AdresseModifierComponent;
  let fixture: ComponentFixture<AdresseModifierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdresseModifierComponent]
    });
    fixture = TestBed.createComponent(AdresseModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
