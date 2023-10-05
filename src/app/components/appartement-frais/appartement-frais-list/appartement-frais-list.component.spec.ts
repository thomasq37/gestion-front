import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementFraisListComponent } from './appartement-frais-list.component';

describe('AppartementFraisListComponent', () => {
  let component: AppartementFraisListComponent;
  let fixture: ComponentFixture<AppartementFraisListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementFraisListComponent]
    });
    fixture = TestBed.createComponent(AppartementFraisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
