import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlerteModifierComponent } from './alerte-modifier.component';

describe('AlerteModifierComponent', () => {
  let component: AlerteModifierComponent;
  let fixture: ComponentFixture<AlerteModifierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlerteModifierComponent]
    });
    fixture = TestBed.createComponent(AlerteModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
