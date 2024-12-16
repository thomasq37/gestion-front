import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocataireTableComponent } from './locataire-table.component';

describe('LocataireTableComponent', () => {
  let component: LocataireTableComponent;
  let fixture: ComponentFixture<LocataireTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocataireTableComponent]
    });
    fixture = TestBed.createComponent(LocataireTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
