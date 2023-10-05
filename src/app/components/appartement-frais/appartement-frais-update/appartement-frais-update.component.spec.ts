import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementFraisUpdateComponent } from './appartement-frais-update.component';

describe('AppartementFraisUpdateComponent', () => {
  let component: AppartementFraisUpdateComponent;
  let fixture: ComponentFixture<AppartementFraisUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementFraisUpdateComponent]
    });
    fixture = TestBed.createComponent(AppartementFraisUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
