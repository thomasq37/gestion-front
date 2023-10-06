import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementDescManageComponent } from './appartement-desc-manage.component';

describe('AppartementDescManageComponent', () => {
  let component: AppartementDescManageComponent;
  let fixture: ComponentFixture<AppartementDescManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementDescManageComponent]
    });
    fixture = TestBed.createComponent(AppartementDescManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
