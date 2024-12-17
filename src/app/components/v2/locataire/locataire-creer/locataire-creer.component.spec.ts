import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocataireCreerComponent } from './locataire-creer.component';

describe('LocataireCreerComponent', () => {
  let component: LocataireCreerComponent;
  let fixture: ComponentFixture<LocataireCreerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocataireCreerComponent]
    });
    fixture = TestBed.createComponent(LocataireCreerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
