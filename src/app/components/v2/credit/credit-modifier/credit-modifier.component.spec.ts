import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditModifierComponent } from './credit-modifier.component';

describe('CreditModifierComponent', () => {
  let component: CreditModifierComponent;
  let fixture: ComponentFixture<CreditModifierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditModifierComponent]
    });
    fixture = TestBed.createComponent(CreditModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
