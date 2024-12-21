import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraisModifierComponent } from './frais-modifier.component';

describe('FraisModifierComponent', () => {
  let component: FraisModifierComponent;
  let fixture: ComponentFixture<FraisModifierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FraisModifierComponent]
    });
    fixture = TestBed.createComponent(FraisModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
