import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresseElementComponent } from './adresse-element.component';

describe('AdresseElementComponent', () => {
  let component: AdresseElementComponent;
  let fixture: ComponentFixture<AdresseElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdresseElementComponent]
    });
    fixture = TestBed.createComponent(AdresseElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
