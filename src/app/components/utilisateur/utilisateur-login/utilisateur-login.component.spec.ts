import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurLoginComponent } from './utilisateur-login.component';

describe('UtilisateurLoginComponent', () => {
  let component: UtilisateurLoginComponent;
  let fixture: ComponentFixture<UtilisateurLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtilisateurLoginComponent]
    });
    fixture = TestBed.createComponent(UtilisateurLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
