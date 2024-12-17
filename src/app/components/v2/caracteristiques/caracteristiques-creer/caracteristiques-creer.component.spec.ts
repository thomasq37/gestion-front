import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracteristiquesCreerComponent } from './caracteristiques-creer.component';

describe('CaracteristiquesCreerComponent', () => {
  let component: CaracteristiquesCreerComponent;
  let fixture: ComponentFixture<CaracteristiquesCreerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaracteristiquesCreerComponent]
    });
    fixture = TestBed.createComponent(CaracteristiquesCreerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
