import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementFraisManageComponent } from './appartement-frais-manage.component';

describe('AppartementFraisManageComponent', () => {
  let component: AppartementFraisManageComponent;
  let fixture: ComponentFixture<AppartementFraisManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementFraisManageComponent]
    });
    fixture = TestBed.createComponent(AppartementFraisManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
