import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraisTableComponent } from './frais-table.component';

describe('FraisTableComponent', () => {
  let component: FraisTableComponent;
  let fixture: ComponentFixture<FraisTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FraisTableComponent]
    });
    fixture = TestBed.createComponent(FraisTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
