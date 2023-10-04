import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementContactListComponent } from './appartement-contact-list.component';

describe('AppartementContactListComponent', () => {
  let component: AppartementContactListComponent;
  let fixture: ComponentFixture<AppartementContactListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementContactListComponent]
    });
    fixture = TestBed.createComponent(AppartementContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
