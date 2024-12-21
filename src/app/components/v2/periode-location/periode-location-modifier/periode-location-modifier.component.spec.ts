import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodeLocationModifierComponent } from './periode-location-modifier.component';

describe('PeriodeLocationModifierComponent', () => {
  let component: PeriodeLocationModifierComponent;
  let fixture: ComponentFixture<PeriodeLocationModifierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeriodeLocationModifierComponent]
    });
    fixture = TestBed.createComponent(PeriodeLocationModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
