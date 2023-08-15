import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAppartementComponent } from './update-appartement.component';

describe('UpdateAppartementComponent', () => {
  let component: UpdateAppartementComponent;
  let fixture: ComponentFixture<UpdateAppartementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAppartementComponent]
    });
    fixture = TestBed.createComponent(UpdateAppartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
