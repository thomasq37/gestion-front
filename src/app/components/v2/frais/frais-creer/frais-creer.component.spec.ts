import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraisCreerComponent } from './frais-creer.component';

describe('FraisCreerComponent', () => {
  let component: FraisCreerComponent;
  let fixture: ComponentFixture<FraisCreerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FraisCreerComponent]
    });
    fixture = TestBed.createComponent(FraisCreerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
