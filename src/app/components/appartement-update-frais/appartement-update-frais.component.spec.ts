import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementUpdateFraisComponent } from './appartement-update-frais.component';

describe('AppartementUpdateFraisComponent', () => {
  let component: AppartementUpdateFraisComponent;
  let fixture: ComponentFixture<AppartementUpdateFraisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementUpdateFraisComponent]
    });
    fixture = TestBed.createComponent(AppartementUpdateFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
