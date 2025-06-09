import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementModifierComponent } from './placement-modifier.component';

describe('PlacementModifierComponent', () => {
  let component: PlacementModifierComponent;
  let fixture: ComponentFixture<PlacementModifierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlacementModifierComponent]
    });
    fixture = TestBed.createComponent(PlacementModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
