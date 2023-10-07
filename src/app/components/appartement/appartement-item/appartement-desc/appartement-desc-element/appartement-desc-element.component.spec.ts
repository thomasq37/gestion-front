import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementDescElementComponent } from './appartement-desc-element.component';

describe('AppartementDescElementComponent', () => {
  let component: AppartementDescElementComponent;
  let fixture: ComponentFixture<AppartementDescElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementDescElementComponent]
    });
    fixture = TestBed.createComponent(AppartementDescElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
