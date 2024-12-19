import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocataireModifierComponent } from './locataire-modifier.component';

describe('LocataireModifierComponent', () => {
  let component: LocataireModifierComponent;
  let fixture: ComponentFixture<LocataireModifierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocataireModifierComponent]
    });
    fixture = TestBed.createComponent(LocataireModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
