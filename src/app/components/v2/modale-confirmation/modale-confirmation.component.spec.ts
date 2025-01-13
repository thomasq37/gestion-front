import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleConfirmationComponent } from './modale-confirmation.component';

describe('ModaleConfirmationComponent', () => {
  let component: ModaleConfirmationComponent;
  let fixture: ComponentFixture<ModaleConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModaleConfirmationComponent]
    });
    fixture = TestBed.createComponent(ModaleConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
