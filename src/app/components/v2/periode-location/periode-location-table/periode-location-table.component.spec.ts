import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodeLocationTableComponent } from './periode-location-table.component';

describe('PeriodeLocationTableComponent', () => {
  let component: PeriodeLocationTableComponent;
  let fixture: ComponentFixture<PeriodeLocationTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeriodeLocationTableComponent]
    });
    fixture = TestBed.createComponent(PeriodeLocationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
