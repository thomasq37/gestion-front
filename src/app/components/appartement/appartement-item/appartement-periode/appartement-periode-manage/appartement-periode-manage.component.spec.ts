import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementPeriodeManageComponent } from './appartement-periode-manage.component';

describe('AppartementPeriodeManageComponent', () => {
  let component: AppartementPeriodeManageComponent;
  let fixture: ComponentFixture<AppartementPeriodeManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementPeriodeManageComponent]
    });
    fixture = TestBed.createComponent(AppartementPeriodeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
