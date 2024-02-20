import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpotsCalculateurComponent } from './impots-calculateur.component';

describe('ImpotsCalculateurComponent', () => {
  let component: ImpotsCalculateurComponent;
  let fixture: ComponentFixture<ImpotsCalculateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImpotsCalculateurComponent]
    });
    fixture = TestBed.createComponent(ImpotsCalculateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
