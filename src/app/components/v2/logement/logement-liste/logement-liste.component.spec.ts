import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogementListeComponent } from './logement-liste.component';

describe('LogementListeComponent', () => {
  let component: LogementListeComponent;
  let fixture: ComponentFixture<LogementListeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogementListeComponent]
    });
    fixture = TestBed.createComponent(LogementListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
