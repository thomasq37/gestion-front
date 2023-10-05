import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementPeriodeUpdateComponent } from './appartement-periode-update.component';

describe('AppartementPeriodeUpdateComponent', () => {
  let component: AppartementPeriodeUpdateComponent;
  let fixture: ComponentFixture<AppartementPeriodeUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementPeriodeUpdateComponent]
    });
    fixture = TestBed.createComponent(AppartementPeriodeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
