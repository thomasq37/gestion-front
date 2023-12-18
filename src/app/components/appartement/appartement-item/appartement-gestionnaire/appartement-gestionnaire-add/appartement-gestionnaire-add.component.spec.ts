import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementGestionnaireAddComponent } from './appartement-gestionnaire-add.component';

describe('AppartementGestionnaireAddComponent', () => {
  let component: AppartementGestionnaireAddComponent;
  let fixture: ComponentFixture<AppartementGestionnaireAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementGestionnaireAddComponent]
    });
    fixture = TestBed.createComponent(AppartementGestionnaireAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
