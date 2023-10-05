import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementPeriodeListComponent } from './appartement-periode-list.component';

describe('AppartementPeriodeListComponent', () => {
  let component: AppartementPeriodeListComponent;
  let fixture: ComponentFixture<AppartementPeriodeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementPeriodeListComponent]
    });
    fixture = TestBed.createComponent(AppartementPeriodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
