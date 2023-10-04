import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementContactAddComponent } from './appartement-contact-add.component';

describe('AppartementContactAddComponent', () => {
  let component: AppartementContactAddComponent;
  let fixture: ComponentFixture<AppartementContactAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementContactAddComponent]
    });
    fixture = TestBed.createComponent(AppartementContactAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
