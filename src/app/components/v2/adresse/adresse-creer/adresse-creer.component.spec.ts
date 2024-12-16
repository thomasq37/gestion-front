import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresseCreerComponent } from './adresse-creer.component';

describe('AdresseCreerComponent', () => {
  let component: AdresseCreerComponent;
  let fixture: ComponentFixture<AdresseCreerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdresseCreerComponent]
    });
    fixture = TestBed.createComponent(AdresseCreerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
