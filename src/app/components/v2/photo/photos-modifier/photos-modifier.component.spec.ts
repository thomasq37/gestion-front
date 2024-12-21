import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosModifierComponent } from './photos-modifier.component';

describe('PhotosModifierComponent', () => {
  let component: PhotosModifierComponent;
  let fixture: ComponentFixture<PhotosModifierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotosModifierComponent]
    });
    fixture = TestBed.createComponent(PhotosModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
