import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCreerComponent } from './credit-creer.component';

describe('CreditCreerComponent', () => {
  let component: CreditCreerComponent;
  let fixture: ComponentFixture<CreditCreerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditCreerComponent]
    });
    fixture = TestBed.createComponent(CreditCreerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
