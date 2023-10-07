import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementAddComponent } from './appartement-add.component';

describe('AppartementAddComponent', () => {
  let component: AppartementAddComponent;
  let fixture: ComponentFixture<AppartementAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementAddComponent]
    });
    fixture = TestBed.createComponent(AppartementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
