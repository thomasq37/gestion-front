import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlerteTableComponent } from './alerte-table.component';

describe('AlerteTableComponent', () => {
  let component: AlerteTableComponent;
  let fixture: ComponentFixture<AlerteTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlerteTableComponent]
    });
    fixture = TestBed.createComponent(AlerteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
