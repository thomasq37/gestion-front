import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditElementComponent } from './credit-element.component';

describe('CreditElementComponent', () => {
  let component: CreditElementComponent;
  let fixture: ComponentFixture<CreditElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditElementComponent]
    });
    fixture = TestBed.createComponent(CreditElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
