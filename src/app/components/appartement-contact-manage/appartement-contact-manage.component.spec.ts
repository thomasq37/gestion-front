import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementContactManageComponent } from './appartement-contact-manage.component';

describe('AppartementContactManageComponent', () => {
  let component: AppartementContactManageComponent;
  let fixture: ComponentFixture<AppartementContactManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementContactManageComponent]
    });
    fixture = TestBed.createComponent(AppartementContactManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
