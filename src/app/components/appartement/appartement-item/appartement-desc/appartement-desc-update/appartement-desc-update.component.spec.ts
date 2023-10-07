import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementDescUpdateComponent } from './appartement-desc-update.component';

describe('AppartementDescUpdateComponent', () => {
  let component: AppartementDescUpdateComponent;
  let fixture: ComponentFixture<AppartementDescUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementDescUpdateComponent]
    });
    fixture = TestBed.createComponent(AppartementDescUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
