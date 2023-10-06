import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementPictureElementComponent } from './appartement-picture-element.component';

describe('AppartementPictureElementComponent', () => {
  let component: AppartementPictureElementComponent;
  let fixture: ComponentFixture<AppartementPictureElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementPictureElementComponent]
    });
    fixture = TestBed.createComponent(AppartementPictureElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
