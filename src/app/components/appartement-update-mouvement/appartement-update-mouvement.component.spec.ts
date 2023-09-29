import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementUpdateMouvementComponent } from './appartement-update-mouvement.component';

describe('AppartementUpdateMouvementComponent', () => {
  let component: AppartementUpdateMouvementComponent;
  let fixture: ComponentFixture<AppartementUpdateMouvementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementUpdateMouvementComponent]
    });
    fixture = TestBed.createComponent(AppartementUpdateMouvementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
