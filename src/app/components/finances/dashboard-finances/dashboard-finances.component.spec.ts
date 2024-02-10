import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFinancesComponent } from './dashboard-finances.component';

describe('DashboardFinancesComponent', () => {
  let component: DashboardFinancesComponent;
  let fixture: ComponentFixture<DashboardFinancesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardFinancesComponent]
    });
    fixture = TestBed.createComponent(DashboardFinancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
