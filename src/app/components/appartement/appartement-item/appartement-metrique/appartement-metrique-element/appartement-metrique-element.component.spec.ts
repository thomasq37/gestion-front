import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementMetriqueElementComponent } from './appartement-metrique-element.component';

describe('AppartementMetriqueElementComponent', () => {
  let component: AppartementMetriqueElementComponent;
  let fixture: ComponentFixture<AppartementMetriqueElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementMetriqueElementComponent]
    });
    fixture = TestBed.createComponent(AppartementMetriqueElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
