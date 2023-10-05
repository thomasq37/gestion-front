import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementPeriodeAddComponent } from './appartement-periode-add.component';

describe('AppartementPeriodeAddComponent', () => {
  let component: AppartementPeriodeAddComponent;
  let fixture: ComponentFixture<AppartementPeriodeAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementPeriodeAddComponent]
    });
    fixture = TestBed.createComponent(AppartementPeriodeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
