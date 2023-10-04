import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementContactUpdateComponent } from './appartement-contact-update.component';

describe('AppartementContactUpdateComponent', () => {
  let component: AppartementContactUpdateComponent;
  let fixture: ComponentFixture<AppartementContactUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementContactUpdateComponent]
    });
    fixture = TestBed.createComponent(AppartementContactUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
