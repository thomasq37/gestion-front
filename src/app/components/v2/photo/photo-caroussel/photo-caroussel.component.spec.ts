import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoCarousselComponent } from './photo-caroussel.component';

describe('PhotoCarousselComponent', () => {
  let component: PhotoCarousselComponent;
  let fixture: ComponentFixture<PhotoCarousselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoCarousselComponent]
    });
    fixture = TestBed.createComponent(PhotoCarousselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
