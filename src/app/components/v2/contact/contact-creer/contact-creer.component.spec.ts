import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCreerComponent } from './contact-creer.component';

describe('ContactCreerComponent', () => {
  let component: ContactCreerComponent;
  let fixture: ComponentFixture<ContactCreerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactCreerComponent]
    });
    fixture = TestBed.createComponent(ContactCreerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
