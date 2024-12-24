import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlerteCreerComponent } from './alerte-creer.component';

describe('AlerteCreerComponent', () => {
  let component: AlerteCreerComponent;
  let fixture: ComponentFixture<AlerteCreerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlerteCreerComponent]
    });
    fixture = TestBed.createComponent(AlerteCreerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
