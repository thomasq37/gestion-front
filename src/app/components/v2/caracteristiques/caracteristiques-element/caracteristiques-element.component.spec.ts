import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracteristiquesElementComponent } from './caracteristiques-element.component';

describe('CaracteristiquesElementComponent', () => {
  let component: CaracteristiquesElementComponent;
  let fixture: ComponentFixture<CaracteristiquesElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaracteristiquesElementComponent]
    });
    fixture = TestBed.createComponent(CaracteristiquesElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
