import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementGestionnaireManageComponent } from './appartement-gestionnaire-manage.component';

describe('AppartementGestionnaireManageComponent', () => {
  let component: AppartementGestionnaireManageComponent;
  let fixture: ComponentFixture<AppartementGestionnaireManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementGestionnaireManageComponent]
    });
    fixture = TestBed.createComponent(AppartementGestionnaireManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
