import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementGestionnaireListComponent } from './appartement-gestionnaire-list.component';

describe('AppartementGestionnaireListComponent', () => {
  let component: AppartementGestionnaireListComponent;
  let fixture: ComponentFixture<AppartementGestionnaireListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementGestionnaireListComponent]
    });
    fixture = TestBed.createComponent(AppartementGestionnaireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
