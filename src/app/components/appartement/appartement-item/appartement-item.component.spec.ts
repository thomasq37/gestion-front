import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementItemComponent } from './appartement-item.component';

describe('AppartementItemComponent', () => {
  let component: AppartementItemComponent;
  let fixture: ComponentFixture<AppartementItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementItemComponent]
    });
    fixture = TestBed.createComponent(AppartementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
