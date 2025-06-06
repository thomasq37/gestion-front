import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementVueEnsembleComponent } from './placement-vue-ensemble.component';

describe('PlacementVueEnsembleComponent', () => {
  let component: PlacementVueEnsembleComponent;
  let fixture: ComponentFixture<PlacementVueEnsembleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlacementVueEnsembleComponent]
    });
    fixture = TestBed.createComponent(PlacementVueEnsembleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
