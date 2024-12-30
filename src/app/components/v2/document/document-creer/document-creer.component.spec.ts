import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCreerComponent } from './document-creer.component';

describe('DocumentCreerComponent', () => {
  let component: DocumentCreerComponent;
  let fixture: ComponentFixture<DocumentCreerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentCreerComponent]
    });
    fixture = TestBed.createComponent(DocumentCreerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
