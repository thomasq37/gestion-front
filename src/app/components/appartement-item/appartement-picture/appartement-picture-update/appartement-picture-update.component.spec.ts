import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementPictureUpdateComponent } from './appartement-picture-update.component';

describe('AppartementPictureUpdateComponent', () => {
  let component: AppartementPictureUpdateComponent;
  let fixture: ComponentFixture<AppartementPictureUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementPictureUpdateComponent]
    });
    fixture = TestBed.createComponent(AppartementPictureUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
