import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogButtonsComponent } from './log-buttons.component';

describe('LogButtonsComponent', () => {
  let component: LogButtonsComponent;
  let fixture: ComponentFixture<LogButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogButtonsComponent]
    });
    fixture = TestBed.createComponent(LogButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
