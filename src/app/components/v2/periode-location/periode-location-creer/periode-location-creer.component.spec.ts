import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodeLocationCreerComponent } from './periode-location-creer.component';

describe('PeriodeLocationCreerComponent', () => {
  let component: PeriodeLocationCreerComponent;
  let fixture: ComponentFixture<PeriodeLocationCreerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeriodeLocationCreerComponent]
    });
    fixture = TestBed.createComponent(PeriodeLocationCreerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
