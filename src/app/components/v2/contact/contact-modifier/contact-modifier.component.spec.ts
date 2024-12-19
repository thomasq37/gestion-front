import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactModifierComponent } from './contact-modifier.component';

describe('ContactModifierComponent', () => {
  let component: ContactModifierComponent;
  let fixture: ComponentFixture<ContactModifierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactModifierComponent]
    });
    fixture = TestBed.createComponent(ContactModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
