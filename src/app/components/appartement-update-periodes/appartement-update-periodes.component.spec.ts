import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementUpdatePeriodesComponent } from './appartement-update-periodes.component';

describe('AppartementUpdatePeriodesComponent', () => {
  let component: AppartementUpdatePeriodesComponent;
  let fixture: ComponentFixture<AppartementUpdatePeriodesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementUpdatePeriodesComponent]
    });
    fixture = TestBed.createComponent(AppartementUpdatePeriodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
