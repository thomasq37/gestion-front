import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementCreerComponent } from './placement-creer.component';

describe('PlacementCreerComponent', () => {
  let component: PlacementCreerComponent;
  let fixture: ComponentFixture<PlacementCreerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlacementCreerComponent]
    });
    fixture = TestBed.createComponent(PlacementCreerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
