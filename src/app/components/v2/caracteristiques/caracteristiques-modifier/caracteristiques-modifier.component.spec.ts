import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracteristiquesModifierComponent } from './caracteristiques-modifier.component';

describe('CaracteristiquesModifierComponent', () => {
  let component: CaracteristiquesModifierComponent;
  let fixture: ComponentFixture<CaracteristiquesModifierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaracteristiquesModifierComponent]
    });
    fixture = TestBed.createComponent(CaracteristiquesModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
