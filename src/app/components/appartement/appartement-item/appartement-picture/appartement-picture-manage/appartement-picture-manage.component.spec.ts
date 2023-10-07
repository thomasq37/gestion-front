import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementPictureManageComponent } from './appartement-picture-manage.component';

describe('AppartementPictureManageComponent', () => {
  let component: AppartementPictureManageComponent;
  let fixture: ComponentFixture<AppartementPictureManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementPictureManageComponent]
    });
    fixture = TestBed.createComponent(AppartementPictureManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
