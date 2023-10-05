import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementFraisAddComponent } from './appartement-frais-add.component';

describe('AppartementFraisAddComponent', () => {
  let component: AppartementFraisAddComponent;
  let fixture: ComponentFixture<AppartementFraisAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementFraisAddComponent]
    });
    fixture = TestBed.createComponent(AppartementFraisAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
