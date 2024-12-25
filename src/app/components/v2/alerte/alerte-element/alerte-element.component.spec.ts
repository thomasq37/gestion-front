import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlerteElementComponent } from './alerte-element.component';

describe('AlerteElementComponent', () => {
  let component: AlerteElementComponent;
  let fixture: ComponentFixture<AlerteElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlerteElementComponent]
    });
    fixture = TestBed.createComponent(AlerteElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
