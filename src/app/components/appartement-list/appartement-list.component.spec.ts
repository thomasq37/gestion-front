import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementListComponent } from './appartement-list.component';

describe('AppartementListComponent', () => {
  let component: AppartementListComponent;
  let fixture: ComponentFixture<AppartementListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppartementListComponent]
    });
    fixture = TestBed.createComponent(AppartementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
