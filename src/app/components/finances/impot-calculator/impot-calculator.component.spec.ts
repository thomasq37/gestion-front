import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpotCalculatorComponent } from './impot-calculator.component';

describe('ImpotCalculatorComponent', () => {
  let component: ImpotCalculatorComponent;
  let fixture: ComponentFixture<ImpotCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImpotCalculatorComponent]
    });
    fixture = TestBed.createComponent(ImpotCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
