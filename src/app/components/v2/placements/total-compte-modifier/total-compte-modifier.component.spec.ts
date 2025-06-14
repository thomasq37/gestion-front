import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCompteModifierComponent } from './total-compte-modifier.component';

describe('TotalCompteModifierComponent', () => {
  let component: TotalCompteModifierComponent;
  let fixture: ComponentFixture<TotalCompteModifierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalCompteModifierComponent]
    });
    fixture = TestBed.createComponent(TotalCompteModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
