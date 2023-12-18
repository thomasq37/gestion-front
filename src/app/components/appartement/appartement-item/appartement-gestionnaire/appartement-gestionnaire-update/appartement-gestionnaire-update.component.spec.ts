import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementGestionnaireUpdateComponent } from './appartement-gestionnaire-update.component';

describe('AppartementGestionnaireUpdateComponent', () => {
  let component: AppartementGestionnaireUpdateComponent;
  let fixture: ComponentFixture<AppartementGestionnaireUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementGestionnaireUpdateComponent]
    });
    fixture = TestBed.createComponent(AppartementGestionnaireUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
