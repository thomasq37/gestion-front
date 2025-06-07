import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutilCapaciteEmpruntComponent } from './outil-capacite-emprunt.component';

describe('OutilCapaciteEmpruntComponent', () => {
  let component: OutilCapaciteEmpruntComponent;
  let fixture: ComponentFixture<OutilCapaciteEmpruntComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutilCapaciteEmpruntComponent]
    });
    fixture = TestBed.createComponent(OutilCapaciteEmpruntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
